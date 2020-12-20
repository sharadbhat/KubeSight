import React, { Component } from "react";
import { message, Tag, Tooltip, Collapse, Descriptions, Popover, Button, Popconfirm } from "antd";
import axios from "axios";
import moment from "moment";
import { v4 as uuid } from "uuid";

// Components
import DataTable from "../../../components/DataTable";

// Utils
import { Context } from "../../../utils/Context";

import {
  DeleteOutlined,
} from '@ant-design/icons';

class JobsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
    };

    this.columns = [
      {
        title: "Name",
        dataIndex: ["metadata", "name"],
        key: uuid(),
        sorter: (a, b) => a.metadata.name.localeCompare(b.metadata.name),
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Namespace",
        dataIndex: ["metadata", "namespace"],
        key: uuid(),
      },
      {
        title: "Labels",
        dataIndex: ["metadata", "labels"],
        key: uuid(),
        render: (labelObject) => {
          let labelList = [];
          for (const label in labelObject) {
            if (labelObject.hasOwnProperty(label)) {
              labelList.push(`${label}: ${labelObject[label]}`);
            }
          }

          if (labelList.length > 0) {
            return (
              <Collapse key={uuid()}>
                <Collapse.Panel header="View">
                  {labelList.map((label) => {
                    return <Tag>{label}</Tag>;
                  })}
                </Collapse.Panel>
              </Collapse>
            );
          } else {
            return "-";
          }
        },
      },
      {
        title: "Pods",
        dataIndex: ["status"],
        key: uuid(),
        render: (statusObject) => {
          let total =
            (statusObject["active"] || 0) +
            (statusObject["succeeded"] || 0) +
            (statusObject["failed"] || 0);
          return (
            <Popover
              placement="right"
              content={
                <Descriptions bordered size="small" column={1}>
                  <Descriptions.Item label={<Tag color="green">Active</Tag>}>
                    {statusObject["active"] || 0}
                  </Descriptions.Item>
                  <Descriptions.Item label={<Tag color="blue">Succeeded</Tag>}>
                    {statusObject["succeeded"] || 0}
                  </Descriptions.Item>
                  <Descriptions.Item label={<Tag color="red">Failed</Tag>}>
                    {statusObject["failed"] || 0}
                  </Descriptions.Item>
                </Descriptions>
              }
            >{`${statusObject["active"] || 0} / ${total}`}</Popover>
          );
        },
      },
      {
        title: "Age",
        dataIndex: ["metadata", "creationTimestamp"],
        key: uuid(),
        sorter: (a, b) =>
          moment(b.metadata.creationTimestamp) -
          moment(a.metadata.creationTimestamp),
        sortDirections: ["descend", "ascend"],
        render: (creationTimestamp) => {
          return (
            <Tooltip
              title={moment(creationTimestamp).format("MMM D, YYYY, h:mm:ss A")}
            >
              {moment(creationTimestamp).fromNow()}
            </Tooltip>
          );
        },
      },
      {
        title: "Images",
        dataIndex: ["spec", "template", "spec", "containers"],
        key: uuid(),
        render: (containersList) => {
          let imageList = [];
          containersList.forEach((container) => {
            imageList.push(container.image);
          });

          if (imageList.length > 0) {
            return (
              <Collapse key={uuid()}>
                <Collapse.Panel header="View">
                  {imageList.map((image) => {
                    return <Tag>{image}</Tag>;
                  })}
                </Collapse.Panel>
              </Collapse>
            );
          } else {
            return "-";
          }
        },
      },
      {
        title: "Actions",
        key: uuid(),
        align: "center",
        render: (row) => {
          return (
            <Popconfirm title="Delete resource?" onConfirm={() => this.deleteResource(row)}>
              <Button danger type="primary" style={{ width: 100 }}>
                <DeleteOutlined /> Delete
              </Button>
            </Popconfirm>
          )
        }
      },
    ];
  }

  componentDidMount = () => {
    this.context.setHeader("Jobs");
    this.context.registerNamespaceCallback(this.getUpdatedJobs);
    this.getJobs(this.context.state.namespace);
  };

  componentWillUnmount = () => {
    this.context.deregisterNamespaceCallback();
  };

  getJobs = async (namespace) => {
    try {
      let serverResponse = await axios.get(
        `/api/workload/${namespace}/get-jobs`
      );
      if (serverResponse.status === 200) {
        this.setState({
          data: serverResponse.data.response.body.jobs,
        });
      } else {
        console.log("Error occurred");
        message.error("Error occurred");
      }
    } catch (err) {
      console.log("Error: ", err);
      message.error("Error occurred");
    }
    this.setState({
      loading: false,
    });
  };

  getUpdatedJobs = (namespace) => {
    this.setState({
      loading: true,
    });
    this.getJobs(namespace);
  };

  deleteResource = async row => {
    try {
      let serverResponse = await axios.delete(
        `/api/workload/${row.metadata.namespace}/delete-job?name=${row.metadata.name}`
      )
      if (serverResponse.status === 200) {
        let data = [...this.state.data]
        this.setState({ data: data.filter(item => item.metadata.name !== row.metadata.name) })
        message.success("Resource deleted")
      } else {
        message.error("Error occurred");
      }
    } catch (err) {
      console.log("Error:", err);
    }
  }

  render() {
    return (
      <div>
        <DataTable
          loading={this.state.loading}
          data={this.state.data}
          columns={this.columns}
        />
      </div>
    );
  }
}

JobsList.contextType = Context;

export default JobsList;
