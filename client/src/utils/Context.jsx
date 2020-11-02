import React, { Component } from "react";

const Context = React.createContext();

class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNamespace: "",
    };
  }

  setNamespace = (namespace) => {
    this.setState({
      selectedNamespace: namespace,
    });
  };

  render() {
    return (
      <Context.Provider
        value={{ state: this.state, setNamespace: this.setNamespace }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export { Context, Provider };

export const Consumer = Context.Consumer;
