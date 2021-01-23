import React from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

const ShowPaymentInfo = ({ order }) => {
  return (
    <div>
      <Collapse ghost>
        <Panel header="Details Payment">
          <div className="px-5">
            <p>ID payment: ${order.paymentIntent.id}</p>
            <p>
              Amount:{" "}
              {order.paymentIntent.amount.toLocaleString("en-US", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <p>Method: {order.paymentIntent.payment_method_types[0]}</p>
            <p>Payment: {order.paymentIntent.status.toUpperCase()}</p>
            <p>
              Ordered Date:{" "}
              {new Date(order.paymentIntent.created * 1000).toLocaleString()}
            </p>
            <p>
              Order Status:{" "}
              <span
                className="badge bg-primary text-white"
                style={{ fontSize: "13px", padding: "6px" }}
              >
                {order.orderStatus}
              </span>
            </p>
          </div>
        </Panel>
      </Collapse>
      {/* <p>Order ID: {order.paymentIntent.id}</p> */}
    </div>
  );
};

export default ShowPaymentInfo;
