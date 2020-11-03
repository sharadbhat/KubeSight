import React, { Component } from "react";

// Utils
import { Context } from "../../../utils/Context";

class PersistentVolumesList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.context.setHeader("Persistent Volumes");
  };

  render() {
    return <div></div>;
  }
}

PersistentVolumesList.contextType = Context;

export default PersistentVolumesList;
