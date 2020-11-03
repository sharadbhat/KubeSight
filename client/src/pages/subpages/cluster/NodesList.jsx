import React, { Component } from "react";

// Utils
import { Context } from "../../../utils/Context";

class NodesList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.context.setHeader("Nodes");
  };

  render() {
    return <div></div>;
  }
}

NodesList.contextType = Context;

export default NodesList;
