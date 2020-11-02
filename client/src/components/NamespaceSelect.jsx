import React, { Component } from "react";
import axios from "axios";
import { Select, message } from "antd";

// Utils
import { Context } from "../utils/Context";

class NamespaceSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namespaces: [],
    };
  }

  componentDidMount = () => {
    this.getAvailableNamespaces();
  };

  getAvailableNamespaces = async () => {
    try {
      let serverResponse = await axios.get("/meta/get-namespaces");
      if (serverResponse.status === 200) {
        this.setState({
          namespaces: serverResponse.data.response.body.namespaces,
        });
      } else {
        message.error("Error occured");
      }
    } catch (err) {
      console.log("Error:", err);
      message.error("Error occurred");
    }
  };

  setNamespace = (namespace) => {
    this.context.setNamespace(namespace);
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Select style={{ width: 170 }} onSelect={this.setNamespace}>
          {this.state.namespaces.map((namespace, i) => {
            return <Select.Option key={namespace}>{namespace}</Select.Option>;
          })}
        </Select>
      </div>
    );
  }
}

NamespaceSelect.contextType = Context;

export default NamespaceSelect;
