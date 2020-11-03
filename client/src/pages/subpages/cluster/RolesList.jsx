import React, { Component } from "react";

// Utils
import { Context } from "../../../utils/Context";

class RolesList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.context.setHeader("Roles");
  };

  render() {
    return <div></div>;
  }
}

RolesList.contextType = Context;

export default RolesList;
