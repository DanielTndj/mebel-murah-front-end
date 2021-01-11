import React from "react";
import AdminNav from "../../components/nav/AdminNav";

const AdminDashboard = () => {
  return (
    <div className="row">
        <AdminNav selectedKeys="dashboard" />
        <div className="m-5">
          <p>testtt</p>
          <h1>test</h1>
        </div>
      {/* <div className="col-md-2">
      </div>
      <div className="col">AdminDashboard Page</div> */}
    </div>
  );
};

export default AdminDashboard;
