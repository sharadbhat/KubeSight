import React, { Component } from "react";

const Context = React.createContext();

class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "",
      namespace: "default",
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
  };

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          setHeader: this.setHeader,
          setNamespace: this.setNamespace,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export { Context, Provider };

export const Consumer = Context.Consumer;
