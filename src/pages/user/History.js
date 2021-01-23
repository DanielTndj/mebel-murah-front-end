import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import { Collapse } from "antd";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/order/Invoice";

const { Panel } = Collapse;

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () => {
    getUserOrders(user.token).then((res) => setOrders(res.data));
  };

  const showOrderInTable = (order) => (
    <div className="table-responsive">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Material</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((p, idx) => (
            <tr key={idx}>
              <td>{p.product.title}</td>
              <td>IDR {p.product.price}</td>
              <td>{p.product.fabric}</td>
              <td>{p.color}</td>
              <td>{p.count}</td>
              <td>
                {p.product.shipping === "Yes" ? (
                  <CheckCircleOutlined
                    className="text-success"
                    style={{ fontSize: "20px" }}
                  />
                ) : (
                  <CloseCircleOutlined
                    className="text-danger"
                    style={{ fontSize: "20px" }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const showDownloadLink = (order) => {
    return (
      <PDFDownloadLink
        document={<Invoice order={order} />}
        fileName="invoice.pdf"
        style={{ position: "relative", top: "-13px" }}
        className="ml-3 btn btn-outline-dark btn-raised"
      >
        Download PDF
      </PDFDownloadLink>
    );
  };

  const showOrders = () =>
    orders.map((order, idx) => (
      <div key={idx} className="p-3">
        <h6 style={{ fontSize: "18px" }}>Detail Order</h6>
        <ShowPaymentInfo order={order} />
        <br />
        <Collapse
          ghost
          style={{ position: "relative", top: "-20px" }}
          defaultActiveKey={["1"]}
        >
          <Panel header="Details Product" key="1">
            {showOrderInTable(order)}
          </Panel>
        </Collapse>
        <div className="row">
          <div className="col">{showDownloadLink(order)}</div>
        </div>
      </div>
    ));

  return (
    <div className="row">
      <UserNav selectedKeys="history" />
      <div className="m-5 col">
        <h5>
          {orders.length > 0 ? "User Purchase Orders" : "No Purchase Orders"}
        </h5>
        <hr className="p-2" />
        <div className="row">
          <div className="col-md-12">{showOrders()}</div>
        </div>
      </div>
    </div>
  );
};

export default History;
