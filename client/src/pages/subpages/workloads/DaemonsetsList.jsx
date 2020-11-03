import React, { Component } from "react";

// Utils
import { Context } from "../../../utils/Context";

class DaemonsetsList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.context.setHeader("Daemon Sets");
  };

  render() {
    return <div></div>;
  }
}

DaemonsetsList.contextType = Context;

export default DaemonsetsList;
