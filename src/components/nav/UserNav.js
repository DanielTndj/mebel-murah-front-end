import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { HistoryOutlined, HeartOutlined, KeyOutlined } from "@ant-design/icons";

const { Item } = Menu;

const UserNav = () => {
  const [current, setCurrent] = useState("history");
  const handleMenu = (event) => {
    setCurrent(event.key);
  };

  return (
    <Menu onClick={handleMenu} defaultSelectedKeys={current} mode="inline">
      <Item key="history" icon={<HistoryOutlined />}>
        <Link to="/user/history">History</Link>
      </Item>
      <Item key="password" icon={<KeyOutlined />}>
        <Link to="/user/password">Password</Link>
      </Item>
      <Item key="wishlist" icon={<HeartOutlined />}>
        <Link to="/user/wishlist">Wishlist</Link>
      </Item>
    </Menu>
  );
};

export default UserNav;
