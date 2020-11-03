import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu } from "antd";

// Components
import NamespaceSelect from "./NamespaceSelect";

// Utils
import siderMenuConfig from "../utils/siderMenuConfig.js";
import pathMap from "../utils/pathMap.json";

class SiderMenu extends Component {
  constructor(props) {
    super(props);

    this.path = props.location.pathname;

    this.state = {
      renderedMenu: null,
    };
  }

  componentDidMount = () => {
    this.renderMenu();
  };

  renderMenu = () => {
    let renderedMenu = [];
    siderMenuConfig.forEach((submenu, i) => {
      let subMenuItems = [];
      submenu.items.forEach((item, j) => {
        if (item.type === "item") {
          subMenuItems.push(
            <Menu.Item key={item.key}>
              <Link to={submenu.path + item.path}>{item.stylizedName}</Link>
            </Menu.Item>
          );
        } else if (item.type === "component") {
          subMenuItems.push(item.component);
        }
      });

      renderedMenu.push(
        <Menu.SubMenu
          key={submenu.key}
          title={
            <span style={{ fontWeight: 600 }}>{submenu.stylizedName}</span>
          }
        >
          {subMenuItems}
        </Menu.SubMenu>
      );
    });

    this.setState({
      renderedMenu: renderedMenu,
    });
  };

  render() {
    return (
      <Menu
        theme="dark"
        defaultOpenKeys={[pathMap[this.path].parentKey]}
        defaultSelectedKeys={[pathMap[this.path].key]}
        mode="inline"
      >
        {this.state.renderedMenu}
      </Menu>
    );
  }
}

SiderMenu.propTypes = {
  location: PropTypes.object.isRequired,
};

export default SiderMenu;
