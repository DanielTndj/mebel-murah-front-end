import React from "react";
import { Button } from "antd";

const Checkout = () => {
  const saveAddressToDb = () => {};

  return (
    <div class="container-fluid">
      <div className="row p-5">
        <div className="col-md-8">
          <h3>Delivery Address</h3>
          <Button
            onClick={saveAddressToDb}
            type="primary"
            size="middle"
            className="btn btn-outline-dark btn-raised"
          >
            Save
          </Button>
          <hr />
          <h5>Got Coupon?</h5>
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          <hr />
          <p>List of Products</p>
          <hr />
          <p>Cart Total: IDR ....</p>

          <div className="row pt-3">
            <div className="col-md justify-content-end">
              <Button
                type="primary"
                size="middle"
                className="btn btn-warning btn-raised btn-block"
              >
                Place Order
              </Button>
            </div>
            <div className="col-md">
              <Button
                type="primary"
                size="middle"
                className="btn btn-outline-secondary btn-raised btn-block"
              >
                Empty Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
