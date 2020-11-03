import React, { Component } from "react";

// Utils
import { Context } from "../../../utils/Context";

class ReplicasetsList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.context.setHeader("Replica Sets");
  };

  render() {
    return <div></div>;
  }
}

ReplicasetsList.contextType = Context;

export default ReplicasetsList;
