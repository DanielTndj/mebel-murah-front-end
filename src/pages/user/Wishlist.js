import React from "react";
import UserNav from "../../components/nav/UserNav";

const Wishlist = () => {
  return (
    <div className="row">
      <UserNav selectedKeys="wishlist" />
      <div className="m-5">Wishlist page</div>
    </div>
  );
};

export default Wishlist;
