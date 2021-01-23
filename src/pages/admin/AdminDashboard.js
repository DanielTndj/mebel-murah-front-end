import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from '../../components/order/Orders'

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    getOrders(user.token).then((res) => setOrders(res.data));
  };

  const handleStatusChange = (orderId, orderStatus, orderedBy) => {
    changeStatus(orderId, orderStatus, orderedBy, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };

  return (
    <div className="row">
      <AdminNav selectedKeys="dashboard" />
      <div className="m-5 col">
        <h5>Admin Dashboard</h5>
        <div className="row">
          <div className="col-md-12">
            <Orders orders={orders} handleStatusChange={handleStatusChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
