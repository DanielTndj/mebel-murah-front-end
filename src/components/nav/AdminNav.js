import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Button } from "antd";
import {
  AppstoreOutlined,
  InboxOutlined,
  LockOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  NumberOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Item } = Menu;

const AdminNav = ({ selectedKeys }) => {
  const [curr, setCurr] = useState("dashboard");
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
        <Item key="dashboard" icon={<UserOutlined />}>
          <Link to="/admin/dashboard">Dashboard</Link>
        </Item>
        <Item key="product" icon={<InboxOutlined />}>
          <Link to="/admin/product">Product</Link>
        </Item>
        <Item key="products" icon={<AppstoreOutlined />}>
          <Link to="/admin/product">Products</Link>
        </Item>
        <Item key="category" icon={<UnorderedListOutlined />}>
          <Link to="/admin/category">Category</Link>
        </Item>
        <Item key="subcategory" icon={<UnorderedListOutlined />}>
          <Link to="/admin/sub">Sub Category</Link>
        </Item>
        <Item key="coupons" icon={<NumberOutlined />}>
          <Link to="/admin/coupons">Coupons</Link>
        </Item>
        <Item key="password" icon={<LockOutlined />}>
          <Link to="/user/password">Password</Link>
        </Item>
      </Menu>
    </div>
  );
};

export default AdminNav;
