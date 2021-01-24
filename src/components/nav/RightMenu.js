import React from "react";
import { HomeOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Grid } from "antd";
import { Link } from "react-router-dom";
import SearchForm from "../../components/forms/Search";

const { SubMenu, Item } = Menu;
const { useBreakpoint } = Grid;

const RightMenu = ({ user, logout, handleClick, current }) => {
  const { md } = useBreakpoint();

  return (
    <Menu
      className="row"
      mode={md ? "horizontal" : "inline"}
      style={{ marginTop: "10px" }}
      onClick={handleClick}
      selectedKeys={[current]}
    >
      {!user && (
        <Item key="login">
          <Link to="/login">Login</Link>
        </Item>
      )}
      {!user && (
        <Item key="register">
          <Link to="/register">Register</Link>
        </Item>
      )}
      {user && (
        <SubMenu
          key="SubMenu"
          icon={<UserOutlined />}
          title={user.email && user.email.split("@")[0]}
          className="float-md-right"
        >
          {user && user.role === "customer" && (
            <Item key="dashboard" icon={<HomeOutlined />}>
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}

          {user && user.role === "admin" && (
            <Item key="dashboard" icon={<HomeOutlined />}>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}
          <Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
      <div className="ml-4 ml-md-3 pt-1">
        <SearchForm />
      </div>
    </Menu>
  );
};

export default RightMenu;
