import React, { Component } from "react";

// Utils
import { Context } from "../../../utils/Context";

class NamespacesList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.context.setHeader("Namespaces");
  };

  render() {
    return <div></div>;
  }
}

NamespacesList.contextType = Context;

export default NamespacesList;
