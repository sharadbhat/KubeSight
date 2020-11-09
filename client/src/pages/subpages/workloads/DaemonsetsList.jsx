import React, { Component } from "react";
import { message, Tag, Tooltip, Collapse } from "antd";
import axios from "axios";
import moment from "moment";
import { v4 as uuid } from "uuid";

// Components
import DataTable from "../../../components/DataTable";

// Utils
import { Context } from "../../../utils/Context";

class DaemonsetsList extends Component {
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
    ];
  }

  componentDidMount = () => {
    this.context.setHeader("Daemon Sets");
    this.getDaemonSets();
  };

  getDaemonSets = async () => {
    try {
      let serverResponse = await axios.get(
        `/api/workload/${this.context.state.namespace}/get-daemon-sets`
      );
      if (serverResponse.status === 200) {
        this.setState({
          data: serverResponse.data.response.body.daemonSets,
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

DaemonsetsList.contextType = Context;

export default DaemonsetsList;
