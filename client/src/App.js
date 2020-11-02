import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

// Pages
import CronjobsList from "./pages/CronjobsList";
import PodsList from "./pages/PodsList";

// Components
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
                  <Switch>
                    <Route
                      path="/workloads/cronjobs"
                      exact
                      component={CronjobsList}
                    />
                    <Route path="/workloads/pods" exact component={PodsList} />
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
