import React, { Component } from "react";

// Utils
import { Context } from "../../../utils/Context";

class CronjobsList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.context.setHeader("Cron Jobs");
  };

  render() {
    return <div></div>;
  }
}

CronjobsList.contextType = Context;

export default CronjobsList;
