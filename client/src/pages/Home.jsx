import React, { Component } from 'react'
import { message, Tooltip } from "antd";
import axios from "axios";
import moment from "moment";
import { v4 as uuid } from "uuid";

// Components
import DataTable from "../components/DataTable";

// Utils
import { Context } from "../utils/Context";

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: []
    }

    this.columns = [
      {
        title: "Last Seen",
        dataIndex: ["lastTimestamp"],
        key: uuid(),
        sorter: (a, b) =>
          moment(b.lastTimestamp) -
          moment(a.lastTimestamp),
        sortDirections: ["descend", "ascend"],
        render: (lastTimestamp) => {
          return (
            <Tooltip
              title={moment(lastTimestamp).format("MMM D, YYYY, h:mm:ss A")}
            >
              {moment(lastTimestamp).fromNow()}
            </Tooltip>
          );
        },
      },
      {
        title: "Type",
        dataIndex: ["type"],
        key: uuid(),
      },
      {
        title: "Reason",
        dataIndex: ["reason"],
        key: uuid()
      },
      {
        title: "Object",
        dataIndex: ["involvedObject"],
        key: uuid(),
        render: (object) => {
          return object.kind + "/" + object.name
        }
      },
      {
        title: "Message",
        dataIndex: ["message"],
        key: uuid()
      }
    ]
  }

  componentDidMount = () => {
    this.context.setHeader("Cluster Events");
    this.getEvents();
  };

  getEvents = async () => {
    try {
      let serverResponse = await axios.get("/api/cluster/get-cluster-events");
      if (serverResponse.status === 200) {
        this.setState({
          data: serverResponse.data.response.body.clusterEvents,
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

  render() {
    return (
      <div>
        <DataTable
          loading={this.state.loading}
          data={this.state.data}
          columns={this.columns}
        />
      </div>
    )
  }
}

Home.contextType = Context

export default Home
