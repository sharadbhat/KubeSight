import React, { Component } from "react";
import { message, Tag, Tooltip, List, Button, Modal } from "antd";
import axios from "axios";
import moment from "moment";
import { v4 as uuid } from "uuid";

// Components
import DataTable from "../../../components/DataTable";

// Utils
import { Context } from "../../../utils/Context";

class NamespacesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      labels: [],
      labelsModalVisible: false,
    };

    this.phaseColors = {
      Active: "green",
      Terminating: "red",
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
          return (
            <Button
              onClick={() =>
                this.setState({
                  labels: labelList,
                  labelsModalVisible: true,
                })
              }
            >
              View labels
            </Button>
          );
        },
      },
      {
        title: "Phase",
        dataIndex: ["status", "phase"],
        key: uuid(),
        render: (phase) => {
          return <Tag color={this.phaseColors[phase]}>{phase}</Tag>;
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
              placement="right"
            >
              {moment(creationTimestamp).fromNow()}
            </Tooltip>
          );
        },
      },
    ];
  }

  componentDidMount = () => {
    this.context.setHeader("Namespaces");
    this.getNamespaces();
  };

  getNamespaces = async () => {
    try {
      let serverResponse = await axios.get("/cluster/get-namespaces");
      if (serverResponse.status === 200) {
        this.setState({
          data: serverResponse.data.response.body.namespaces,
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
        <Modal
          title="Labels"
          visible={this.state.labelsModalVisible}
          onCancel={() => this.setState({ labelsModalVisible: false })}
          footer={null}
        >
          <List
            dataSource={this.state.labels}
            bordered
            style={{ maxHeight: 400, overflowY: "scroll" }}
            renderItem={(item) => {
              return <List.Item>{item}</List.Item>;
            }}
          />
        </Modal>
      </div>
    );
  }
}

NamespacesList.contextType = Context;

export default NamespacesList;
