import React, { Component } from "react";
import { message, Tag, Tooltip, Collapse } from "antd";
import axios from "axios";
import moment from "moment";
import { v4 as uuid } from "uuid";

// Components
import DataTable from "../../../components/DataTable";

// Utils
import { Context } from "../../../utils/Context";

class StorageClassesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
        title: "Provisioner",
        dataIndex: ["provisioner"],
        key: uuid(),
      },
      {
        title: "Parameters",
        dataIndex: ["parameters"],
        key: uuid(),
        render: (parameterObject) => {
          let parametersList = [];
          for (const parameter in parameterObject) {
            if (parameterObject.hasOwnProperty(parameter)) {
              parametersList.push(
                `${parameter}: ${parameterObject[parameter]}`
              );
            }
          }

          if (parametersList.length > 0) {
            return (
              <Collapse key={uuid()}>
                <Collapse.Panel header="View">
                  {parametersList.map((parameter) => {
                    return <Tag>{parameter}</Tag>;
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
    this.context.setHeader("Storage Classes");
    this.getStorageClasses();
  };

  getStorageClasses = async () => {
    try {
      let serverResponse = await axios.get("/api/cluster/get-storage-classes");
      if (serverResponse.status === 200) {
        this.setState({
          data: serverResponse.data.response.body.storageClasses,
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

StorageClassesList.contextType = Context;

export default StorageClassesList;
