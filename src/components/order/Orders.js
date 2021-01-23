import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import { Select } from "antd";
import { Collapse } from "antd";

const { Panel } = Collapse;
const { Option } = Select;

const Orders = ({ orders, handleStatusChange }) => {
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

  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className="pb-3">
          <ShowPaymentInfo order={order} />
          <div>
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
          </div>
          <div className="row" style={{ position: "relative", top: "-10px" }}>
            <div
              className="col-md-4"
              style={{ position: "relative", left: "39px", fontWeight: "500" }}
            >
              Delivery Status
            </div>
            <div className="col-md-8">
              <Select
                defaultValue={order.orderStatus}
                name="status"
                onChange={(value) => handleStatusChange(order._id, value)}
              >
                <Option value="Not Processed">Not Processed</Option>
                <Option value="Processing">Processing</Option>
                <Option value="Dispatched">Dispatched</Option>
                <Option value="Cancelled">Cancelled</Option>
                <Option value="Completed">Completed</Option>
              </Select>
            </div>
          </div>
          <hr/>
        </div>
      ))}
    </>
  );
};

export default Orders;
