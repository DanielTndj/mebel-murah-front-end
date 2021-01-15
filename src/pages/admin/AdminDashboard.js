import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";

const AdminDashboard = () => {
  return (
    <div className="row">
      <AdminNav selectedKeys="dashboard" />

      <div className="m-5 col offset-col-3 col-md">
        <div className="row">
          <h5>Admin Dashboard</h5>
          <hr className="p-2" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
