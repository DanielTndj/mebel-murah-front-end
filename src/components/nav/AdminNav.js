import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Button } from "antd";
import {
  AppstoreOutlined,
  InboxOutlined,
  BlockOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  NumberOutlined,
  BorderOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Item } = Menu;

const AdminNav = ({ selectedKeys }) => {
  const [curr, setCurr] = useState("");
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
          <Link to="/admin/products">Products</Link>
        </Item>
        <Item key="category" icon={<BorderOutlined />}>
          <Link to="/admin/category">Category</Link>
        </Item>
        <Item key="subcategory" icon={<BlockOutlined />}>
          <Link to="/admin/sub-category">Sub Category</Link>
        </Item>
        <Item key="coupon" icon={<NumberOutlined />}>
          <Link to="/admin/coupon">Coupon</Link>
        </Item>
      </Menu>
    </div>
  );
};

export default AdminNav;
