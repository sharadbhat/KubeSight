import React, { Component } from "react";
import { message, Tag, Tooltip, Collapse } from "antd";
import axios from "axios";
import moment from "moment";
import { v4 as uuid } from "uuid";

// Components
import DataTable from "../../../components/DataTable";

// Utils
import { Context } from "../../../utils/Context";

class StatefulsetsList extends Component {
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
          let readyPods = statusObject["readyReplicas"] || 0;
          let totalPods = statusObject["replicas"] || null;

          return `${readyPods} / ${totalPods}`;
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
    this.context.setHeader("Stateful Sets");
    this.context.registerNamespaceCallback(this.getUpdatedStatefulSets);
    this.getStatefulSets(this.context.state.namespace);
  };

  componentWillUnmount = () => {
    this.context.deregisterNamespaceCallback();
  };

  getStatefulSets = async (namespace) => {
    try {
      let serverResponse = await axios.get(
        `/api/workload/${namespace}/get-stateful-sets`
      );
      if (serverResponse.status === 200) {
        this.setState({
          data: serverResponse.data.response.body.statefulSets,
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

  getUpdatedStatefulSets = (namespace) => {
    this.setState({
      loading: true,
    });
    this.getStatefulSets(namespace);
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

StatefulsetsList.contextType = Context;

export default StatefulsetsList;
