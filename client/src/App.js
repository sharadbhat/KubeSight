import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

// Pages
import Cluster from "./pages/Cluster";
import Workloads from "./pages/Workloads";
import Config from "./pages/Config";

// Components
import Header from "./components/Header";
import SiderMenu from "./components/SiderMenu";

// Utils
import { Provider } from "./utils/Context";

// CSS
import "antd/dist/antd.css";
import "./App.css";

const { Content, Sider } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    document.title = "KubeSight";
  }

  render() {
    return (
      <Provider>
        <Layout style={{ height: "100vh" }}>
          <Router>
            <Sider>
              <div className="logo" />
              <SiderMenu location={this.props.location} />
            </Sider>
            <Layout className="site-layout">
              <Content style={{ margin: "15px" }}>
                <div className="site-layout-background">
                  <Header />
                  <Switch>
                    {Cluster.map((props) => (
                      <Route {...props} />
                    ))}
                    {Workloads.map((props) => (
                      <Route {...props} />
                    ))}
                    {Config.map((props) => (
                      <Route {...props} />
                    ))}
                  </Switch>
                </div>
              </Content>
            </Layout>
          </Router>
        </Layout>
      </Provider>
    );
  }
}

export default App;
