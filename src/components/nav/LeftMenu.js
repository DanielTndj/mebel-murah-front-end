import React from "react";
import { Menu, Grid } from "antd";
// import {
//   BuildOutlined,
//   HomeOutlined,
//   LogoutOutlined,
//   ShopTwoTone,
//   UserAddOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu, Item } = Menu;
const { useBreakpoint } = Grid;

const LeftMenu = ({ handleClick, current }) => {
  const { md } = useBreakpoint();
  return (
    <Menu
      mode={md ? "horizontal" : "inline"}
      style={{ marginTop: "10px" }}
      onClick={handleClick}
      selectedKeys={[current]}
    >
      <Item key="home">
        <Link to="/">Home</Link>
      </Item>
      {/* <SubMenu key="sub1" title={<span>Shop</span>}>
        <MenuItemGroup title="Item 1">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </MenuItemGroup>
      </SubMenu>
      <Menu.Item key="alipay">
        <a href="">Contact Us</a>
      </Menu.Item> */}
    </Menu>
  );
};

export default LeftMenu;
