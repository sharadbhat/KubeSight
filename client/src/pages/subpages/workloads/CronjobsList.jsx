import React, { Component } from "react";
import { message, Tag, Tooltip, Collapse } from "antd";
import axios from "axios";
import moment from "moment";
import { v4 as uuid } from "uuid";
import cronstrue from "cronstrue";

// Components
import DataTable from "../../../components/DataTable";

// Utils
import { Context } from "../../../utils/Context";

class CronjobsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
    };

    this.suspendColors = {
      True: "orange",
      False: "green",
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
        title: "Schedule",
        dataIndex: ["spec", "schedule"],
        key: uuid(),
        render: (schedule) => {
          return (
            <Tooltip title={cronstrue.toString(schedule)}>{schedule}</Tooltip>
          );
        },
      },
      {
        title: "Suspend",
        dataIndex: ["spec", "suspend"],
        key: uuid(),
        render: (suspend) => {
          let suspendVal = suspend ? "True" : "False";
          return <Tag color={this.suspendColors[suspendVal]}>{suspendVal}</Tag>;
        },
      },
      {
        title: "Active",
        dataIndex: ["status", "active"],
        key: uuid(),
        render: (activeList) => {
          if (activeList) {
            return activeList.length;
          }
          return 0;
        },
      },
      {
        title: "Last Schedule",
        dataIndex: ["status", "lastScheduleTime"],
        key: uuid(),
        render: (lastScheduleTime) => {
          return (
            <Tooltip
              title={moment(lastScheduleTime).format("MMM D, YYYY, h:mm:ss A")}
            >
              {moment(lastScheduleTime).fromNow()}
            </Tooltip>
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
    ];
  }

  componentDidMount = () => {
    this.context.setHeader("Cron Jobs");
    this.context.registerNamespaceCallback(this.getUpdatedCronJobs);
    this.getCronJobs(this.context.state.namespace);
  };

  componentWillUnmount = () => {
    this.context.deregisterNamespaceCallback();
  };

  getCronJobs = async (namespace) => {
    try {
      let serverResponse = await axios.get(
        `/api/workload/${namespace}/get-cron-jobs`
      );
      if (serverResponse.status === 200) {
        this.setState({
          data: serverResponse.data.response.body.cronJobs,
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

  getUpdatedCronJobs = (namespace) => {
    this.setState({
      loading: true,
    });
    this.getCronJobs(namespace);
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

CronjobsList.contextType = Context;

export default CronjobsList;
