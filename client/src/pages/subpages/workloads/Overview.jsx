import React, { Component } from "react";
import { message } from "antd";
import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";

// Context
import { Context } from "../../../utils/Context";

class Overview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: null,
      data: {
        cronJobs: {
          running: 0,
          paused: 0,
          total: 0,
        },
        daemonSets: {
          pending: 0,
          ready: 0,
          total: 0,
        },
        deployments: {
          pending: 0,
          ready: 0,
          total: 0,
        },
        jobs: {
          active: 0,
          successful: 0,
          failed: 0,
          total: 0,
        },
        pods: {
          pending: 0,
          running: 0,
          successful: 0,
          failed: 0,
          total: 0,
        },
        replicaSets: {
          pending: 0,
          ready: 0,
          total: 0,
        },
      },
    };
  }

  componentDidMount = () => {
    this.context.setHeader("Workloads Overview");
    this.getOverview();
  };

  getOverview = async () => {
    try {
      let serverResponse = await axios.get(
        `/api/workload/${this.context.state.namespace}/get-overview`
      );
      if (serverResponse.status === 200) {
        this.setState({
          data: serverResponse.data.response.body,
        });
      } else {
        message.error("Error occurred");
      }
    } catch (err) {
      console.log("Error:", err);
      message.error("Error occurred");
    }
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {this.state.data.cronJobs.total > 0 && (
          <div>
            <PieChart
              style={{ height: "20vh" }}
              label={({ dataEntry }) => {
                if (dataEntry.value > 0) {
                  return `${Math.round(dataEntry.percentage)}%`;
                }
              }}
              data={[
                {
                  title: "Running",
                  value: this.state.data.cronJobs.running,
                  color: "#90ee90",
                },
                {
                  title: "Paused",
                  value: this.state.data.cronJobs.paused,
                  color: "grey",
                },
              ]}
            />
            <p style={{ textAlign: "center", fontWeight: 600 }}>Cron Jobs</p>
          </div>
        )}
        {this.state.data.daemonSets.total > 0 && (
          <div>
            <PieChart
              style={{ height: "20vh" }}
              label={({ dataEntry }) => {
                if (dataEntry.value > 0) {
                  return `${Math.round(dataEntry.percentage)}%`;
                }
              }}
              data={[
                {
                  title: "Running",
                  value: this.state.data.daemonSets.ready,
                  color: "#90ee90",
                },
                {
                  title: "Pending",
                  value: this.state.data.daemonSets.pending,
                  color: "yellow",
                },
              ]}
            />
            <p style={{ textAlign: "center", fontWeight: 600 }}>Daemon Sets</p>
          </div>
        )}
        {this.state.data.deployments.total > 0 && (
          <div>
            <PieChart
              style={{ height: "20vh" }}
              label={({ dataEntry }) => {
                if (dataEntry.value > 0) {
                  return `${Math.round(dataEntry.percentage)}%`;
                }
              }}
              data={[
                {
                  title: "Running",
                  value: this.state.data.deployments.ready,
                  color: "#90ee90",
                },
                {
                  title: "Pending",
                  value: this.state.data.deployments.pending,
                  color: "yellow",
                },
              ]}
            />
            <p style={{ textAlign: "center", fontWeight: 600 }}>Deployments</p>
          </div>
        )}
        {this.state.data.jobs.total > 0 && (
          <div>
            <PieChart
              style={{ height: "20vh" }}
              label={({ dataEntry }) => {
                if (dataEntry.value > 0) {
                  return `${Math.round(dataEntry.percentage)}%`;
                }
              }}
              data={[
                {
                  title: "Active",
                  value: this.state.data.jobs.active,
                  color: "#90ee90",
                },
                {
                  title: "Successful",
                  value: this.state.data.jobs.successful,
                  color: "green",
                },
                {
                  title: "Failed",
                  value: this.state.data.jobs.failed,
                  color: "red",
                },
              ]}
            />
            <p style={{ textAlign: "center", fontWeight: 600 }}>Jobs</p>
          </div>
        )}
        {this.state.data.pods.total > 0 && (
          <div>
            <PieChart
              style={{ height: "20vh" }}
              label={({ dataEntry }) => {
                if (dataEntry.value > 0) {
                  return `${Math.round(dataEntry.percentage)}%`;
                }
              }}
              data={[
                {
                  title: "Pending",
                  value: this.state.data.pods.pending,
                  color: "yellow",
                },
                {
                  title: "Running",
                  value: this.state.data.pods.running,
                  color: "#90ee90",
                },
                {
                  title: "Successful",
                  value: this.state.data.pods.successful,
                  color: "green",
                },
                {
                  title: "Failed",
                  value: this.state.data.pods.failed,
                  color: "red",
                },
              ]}
            />
            <p style={{ textAlign: "center", fontWeight: 600 }}>Pods</p>
          </div>
        )}
        {this.state.data.replicaSets.total > 0 && (
          <div>
            <PieChart
              style={{ height: "20vh" }}
              label={({ dataEntry }) => {
                if (dataEntry.value > 0) {
                  return `${Math.round(dataEntry.percentage)}%`;
                }
              }}
              data={[
                {
                  title: "Running",
                  value: this.state.data.replicaSets.ready,
                  color: "#90ee90",
                },
                {
                  title: "Pending",
                  value: this.state.data.replicaSets.pending,
                  color: "yellow",
                },
              ]}
            />
            <p style={{ textAlign: "center", fontWeight: 600 }}>Replica Sets</p>
          </div>
        )}
      </div>
    );
  }
}

Overview.contextType = Context;

export default Overview;
