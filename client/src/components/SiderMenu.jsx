import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu } from "antd";

// Components
import NamespaceSelect from "./NamespaceSelect";

class SiderMenu extends Component {
  constructor(props) {
    super(props);

    let path = props.location.pathname.split("/");

    this.state = {
      renderedMenu: null,
      chosenSubMenuKey: path[1],
      chosenItemKey: `${path[1]}-${path[2]}`,
    };

    this.menuItems = [
      {
        name: "workloads",
        stylizedName: "Workloads",
        path: "/workloads",
        items: [
          {
            name: "cronjobs",
            stylizedName: "Cron Jobs",
            path: "/cronjobs",
          },
          {
            name: "pods",
            stylizedName: "Pods",
            path: "/pods",
          },
        ],
      },
    ];
  }

  componentDidMount = () => {
    this.renderMenu();
  };

  renderMenu = () => {
    let renderedMenu = [];
    this.menuItems.forEach((submenu, i) => {
      let subMenuItems = [];
      submenu.items.forEach((item, j) => {
        subMenuItems.push(
          <Menu.Item key={`${submenu.name}-${item.name}`}>
            <Link to={submenu.path + item.path}>{item.stylizedName}</Link>
          </Menu.Item>
        );
      });

      renderedMenu.push(
        <Menu.SubMenu
          key={submenu.name}
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
        defaultOpenKeys={[this.state.chosenSubMenuKey]}
        defaultSelectedKeys={[this.state.chosenItemKey]}
        mode="inline"
      >
        <NamespaceSelect />
        {this.state.renderedMenu}
      </Menu>
    );
  }
}

SiderMenu.propTypes = {
  location: PropTypes.object.isRequired,
};

export default SiderMenu;
