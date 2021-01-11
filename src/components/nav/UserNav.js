import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Button } from "antd";
import {
  HistoryOutlined,
  HeartOutlined,
  LockOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

const { Item } = Menu;

const UserNav = ({ selectedKeys }) => {
  const [curr, setCurr] = useState("history");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCurr(selectedKeys);
  }, [curr]);

  const toggleCollapsed = () => {
    setCollapsed((collapsed) => !collapsed);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16, marginTop: 16 }}
      >
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
      <Menu selectedKeys={[curr]} mode="inline" inlineCollapsed={collapsed}>
        <Item key="history" icon={<HistoryOutlined />}>
          <Link to="/user/history">History</Link>
        </Item>
        <Item key="password" icon={<LockOutlined />}>
          <Link to="/user/password">Password</Link>
        </Item>
        <Item key="wishlist" icon={<HeartOutlined />}>
          <Link to="/user/wishlist">Wishlist</Link>
        </Item>
      </Menu>
    </div>
  );
};

export default UserNav;
