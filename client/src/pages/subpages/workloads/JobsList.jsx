import React, { Component } from "react";

// Utils
import { Context } from "../../../utils/Context";

class JobsList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.context.setHeader("Jobs");
  };

  render() {
    return <div></div>;
  }
}

JobsList.contextType = Context;

export default JobsList;
