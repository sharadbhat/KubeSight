import React, { Component } from "react";
import { message, Tag, Tooltip, Collapse, Button, Popconfirm } from "antd";
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

class PodsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
    };

    this.statusColors = {
      Pending: "orange",
      Running: "green",
      Succeeded: "blue",
      Failed: "red",
      Unknown: "orange",
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
        title: "Node",
        dataIndex: ["spec", "nodeName"],
        key: uuid(),
      },
      {
        title: "Status",
        dataIndex: ["status", "phase"],
        key: uuid(),
        render: (status) => {
          return <Tag color={this.statusColors[status]}>{status}</Tag>;
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
    this.context.setHeader("Pods");
    this.context.registerNamespaceCallback(this.getUpdatedPods);
    this.getPods(this.context.state.namespace);
  };

  componentWillUnmount = () => {
    this.context.deregisterNamespaceCallback();
  };

  getPods = async (namespace) => {
    try {
      let serverResponse = await axios.get(
        `/api/workload/${namespace}/get-pods`
      );
      if (serverResponse.status === 200) {
        this.setState({
          data: serverResponse.data.response.body.pods,
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

  getUpdatedPods = (namespace) => {
    this.setState({
      loading: true,
    });
    this.getPods(namespace);
  };

  deleteResource = async row => {
    try {
      let serverResponse = await axios.delete(
        `/api/workload/${row.metadata.namespace}/delete-pod?name=${row.metadata.name}`
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

PodsList.contextType = Context;

export default PodsList;
