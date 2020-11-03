import React, { Component } from "react";

// Utils
import { Context } from "../../../utils/Context";

class PodsList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.context.setHeader("Pods");
  };

  render() {
    return <div></div>;
  }
}

PodsList.contextType = Context;

export default PodsList;
