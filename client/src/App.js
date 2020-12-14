import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

// Pages
import Home from "./pages/Home";
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
            <Sider
              width={"14vw"}
              className="sidermenu"
              style={{ overflow: "auto" }}
            >
              <div className="logo">
                <Link to="/">
                  <h2 style={{ color: "white", fontWeight: 600 }}>KubeSight</h2>
                </Link>
              </div>
              <div>
                <SiderMenu location={this.props.location} />
              </div>
            </Sider>
            <Layout className="site-layout">
              <Content style={{ margin: "15px" }}>
                <div className="site-layout-background">
                  <Header />
                  <Switch>
                    <Route path="/" exact component={Home} />
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
