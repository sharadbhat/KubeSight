import React, { Component } from "react";

// Utils
import { Context } from "../../../utils/Context";

class StorageClassesList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.context.setHeader("Storage Classes");
  };

  render() {
    return <div></div>;
  }
}

StorageClassesList.contextType = Context;

export default StorageClassesList;
