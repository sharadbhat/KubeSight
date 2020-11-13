import React, { Component } from "react";
import { message, Tag, Tooltip, Collapse } from "antd";
import axios from "axios";
import moment from "moment";
import { v4 as uuid } from "uuid";

// Components
import DataTable from "../../../components/DataTable";

// Utils
import { Context } from "../../../utils/Context";

class PVC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
    };

    this.statusColors = {
      Pending: "orange",
      Bound: "green",
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
        title: "Status",
        dataIndex: ["status", "phase"],
        key: uuid(),
        render: (status) => {
          return <Tag color={this.statusColors[status]}>{status}</Tag>;
        },
      },
      {
        title: "Volume",
        dataIndex: ["spec", "volumeName"],
        key: uuid(),
      },
      {
        title: "Capacity",
        dataIndex: ["spec", "resources", "requests", "storage"],
        key: uuid(),
      },
      {
        title: "Access Modes",
        dataIndex: ["spec", "accessModes"],
        key: uuid(),
        render: (accessModes) => {
          if (accessModes.length > 0) {
            return (
              <Collapse key={uuid()}>
                <Collapse.Panel header="View">
                  {accessModes.map((accessMode) => {
                    return <Tag>{accessMode}</Tag>;
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
        title: "Storage Class",
        dataIndex: ["spec", "storageClassName"],
        key: uuid(),
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
    ];
  }

  componentDidMount = () => {
    this.context.setHeader("Persistent Volume Claims");
    this.context.registerNamespaceCallback(this.getUpdatedPVC);
    this.getPVC(this.context.state.namespace);
  };

  componentWillUnmount = () => {
    this.context.deregisterNamespaceCallback();
  };

  getPVC = async (namespace) => {
    try {
      let serverResponse = await axios.get(`/api/config/${namespace}/get-pvc`);
      if (serverResponse.status === 200) {
        this.setState({
          data: serverResponse.data.response.body.pvc,
        });
      } else {
        message.error("Error occured");
      }
    } catch (err) {
      console.log("Error:", err);
      message.error("Error occurred");
    }
    this.setState({
      loading: false,
    });
  };

  getUpdatedPVC = (namespace) => {
    this.setState({
      loading: true,
    });
    this.getPVC(namespace);
  };

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

PVC.contextType = Context;

export default PVC;
