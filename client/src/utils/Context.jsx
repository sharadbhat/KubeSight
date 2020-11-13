import React, { Component } from "react";

const Context = React.createContext();

class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "",
      namespace: "default",
      namespaceCallback: null,
    };
  }

  setHeader = (header) => {
    this.setState({
      header,
    });
  };

  setNamespace = (namespace) => {
    this.setState({
      namespace,
    });
    if (this.state.namespaceCallback) {
      this.state.namespaceCallback(namespace);
    }
  };

  registerNamespaceCallback = (callback) => {
    this.setState({
      namespaceCallback: callback,
    });
  };

  deregisterNamespaceCallback = () => {
    this.setState({
      namespaceCallback: null,
    });
  };

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          setHeader: this.setHeader,
          setNamespace: this.setNamespace,
          registerNamespaceCallback: this.registerNamespaceCallback,
          deregisterNamespaceCallback: this.deregisterNamespaceCallback,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export { Context, Provider };

export const Consumer = Context.Consumer;
