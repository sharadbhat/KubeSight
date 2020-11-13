import React, { Component } from "react";
import axios from "axios";
import { Select, message, Tooltip } from "antd";

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
      let serverResponse = await axios.get(
        "/api/cluster/get-namespaces?minimal=true"
      );
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
        <Tooltip title="Namespace" placement="right">
          <Select
            showSearch
            style={{ margin: "15px 0px", width: 140 }}
            optionFilterProp="children"
            onSelect={this.setNamespace}
            value={this.context.state.namespace}
            filterOption={(input, option) =>
              option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Select.OptGroup label="Namespaces">
              {this.state.namespaces.map((namespace, i) => {
                return (
                  <Select.Option key={namespace}>{namespace}</Select.Option>
                );
              })}
            </Select.OptGroup>
          </Select>
        </Tooltip>
      </div>
    );
  }
}

NamespaceSelect.contextType = Context;

export default NamespaceSelect;
