import React, { Component } from "react";

// Utils
import { Context } from "../../../utils/Context";

class DeploymentsList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.context.setHeader("Deployments");
  };

  render() {
    return <div></div>;
  }
}

DeploymentsList.contextType = Context;

export default DeploymentsList;
