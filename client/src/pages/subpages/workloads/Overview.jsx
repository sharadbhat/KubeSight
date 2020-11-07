import React, { Component } from "react";

// Context
import { Context } from "../../../utils/Context";

class Overview extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.context.setHeader("Workloads Overview");
  };

  render() {
    return <div></div>;
  }
}

Overview.contextType = Context;

export default Overview;
