import React, { Component } from "react";

// Utils
import { Context } from "../../../utils/Context";

class PVC extends Component {
  componentDidMount = () => {
    this.context.setHeader("Persistent Volume Claims");
  };
  render() {
    return <div></div>;
  }
}

PVC.contextType = Context;

export default PVC;
