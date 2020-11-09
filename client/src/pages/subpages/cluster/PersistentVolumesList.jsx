import React, { Component } from "react";
import { message, Tag, Tooltip, Collapse } from "antd";
import axios from "axios";
import moment from "moment";
import { v4 as uuid } from "uuid";

// Components
import DataTable from "../../../components/DataTable";

// Utils
import { Context } from "../../../utils/Context";

class PersistentVolumesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };

    this.statusColors = {
      Available: "green",
      Bound: "blue",
      Released: "yellow",
      Failed: "red",
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
        title: "Capacity",
        dataIndex: ["spec", "capacity"],
        key: uuid(),
        render: (capacityObject) => {
          let capacityList = [];
          for (const capacity in capacityObject) {
            if (capacityObject.hasOwnProperty(capacity)) {
              capacityList.push(`${capacity}: ${capacityObject[capacity]}`);
            }
          }

          if (capacityList.length > 0) {
            return (
              <Collapse key={uuid()}>
                <Collapse.Panel header="View">
                  {capacityList.map((capacity) => {
                    return <Tag>{capacity}</Tag>;
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
        title: "Access Modes",
        dataIndex: ["spec", "accessModes"],
        key: uuid(),
        render: (accessModesList) => {
          return (
            <Collapse key={uuid()}>
              <Collapse.Panel header="View">
                {accessModesList.map((accessMode) => {
                  return <Tag>{accessMode}</Tag>;
                })}
              </Collapse.Panel>
            </Collapse>
          );
        },
      },
      {
        title: "Reclaim Policy",
        dataIndex: ["spec", "persistentVolumeReclaimPolicy"],
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
    this.context.setHeader("Persistent Volumes");
    this.getPersistentVolumes();
  };

  getPersistentVolumes = async () => {
    try {
      let serverResponse = await axios.get(
        "/api/cluster/get-persistent-volumes"
      );
      if (serverResponse.status === 200) {
        this.setState({
          data: serverResponse.data.response.body.persistentVolumes,
        });
      } else {
        console.log("Error occurred");
        message.error("Error occurred");
      }
    } catch (err) {
      console.log("Error: ", err);
      message.error("Error occurred");
    }
  };

  render() {
    return (
      <div>
        <DataTable data={this.state.data} columns={this.columns} />
      </div>
    );
  }
}

PersistentVolumesList.contextType = Context;

export default PersistentVolumesList;
