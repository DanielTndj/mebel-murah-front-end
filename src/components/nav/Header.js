import React, { useState } from "react";
import { Menu, Drawer, Button } from "antd";
// import {
//   BuildOutlined,
//   HomeOutlined,
//   LogoutOutlined,
//   ShopTwoTone,
//   UserAddOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";

const Header = () => {
  const [current, setCurrent] = useState("home");
  const [visible, setVisible] = useState(false);
  let dispatch = useDispatch();
  let { user,cart } = useSelector((state) => ({ ...state }));
  let history = useHistory();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleClick = (event) => {
    setCurrent(event.key);
  };

  const logout = () => {
    firebase.auth().signOut();

    // update redux state
    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    history.push("/login");
  };

  return (
    <nav className="menuBar">
      <div className="logo">
        <Link to="/">
          <strong>Mebel.</strong>
        </Link>
      </div>
      <div className="menuCon">
        <div className="leftMenu">
          <LeftMenu handleClick={handleClick} current={current} cart={cart} />
        </div>
        <div className="rightMenu">
          <RightMenu
            user={user}
            logout={logout}
            handleClick={handleClick}
            current={current}
          />
        </div>
        <Button
          className="barsMenu"
          type="outline-primary"
          onClick={showDrawer}
        >
          <span className="barsBtn"></span>
        </Button>
        <Drawer
          title="Menu"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu handleClick={handleClick} current={current} cart={cart} />
          <RightMenu
            user={user}
            logout={logout}
            handleClick={handleClick}
            current={current}
          />
        </Drawer>
      </div>
    </nav>
  );
};

export default Header;
