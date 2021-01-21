import React, { useState, useEffect } from "react";
import { Button, Popconfirm } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, emptyUserCart } from "../functions/user";
import { toast } from "react-toastify";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("User cart checkout", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const saveAddressToDb = () => {};

  //empty from local storage, redux, db
  const emptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      toast.success("Cart is empty. Continue shopping.");
    });
  };

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
          <h5>Order Summary</h5>
          <hr />

          <h6>Products ({products.length})</h6>
          {products.map((p, idx) => (
            <div key={idx} style={{ fontSize: "15px" }}>
              <p>
                {p.product.title} ({p.color}) X {p.count} ={" "}
                {p.product.price * p.count}
              </p>
            </div>
          ))}
          <hr />
          <h6>Cart Total: IDR {total}</h6>

          <div className="row pt-3">
            <div className="col-md">
              <Button
                type="primary"
                size="middle"
                className="btn btn-warning btn-raised btn-block"
              >
                Place Order
              </Button>
              {/* </div> */}
              {/* <div className="col-md"> */}
              <Popconfirm
                disabled={!products.length}
                title="Are you sure to delete this cart?"
                onConfirm={emptyCart}
                placement="top"
                okText="Yes"
                cancelText="No"
              >
                <Button
                  disabled={!products.length}
                  type="primary"
                  size="middle"
                  className="btn btn-secondary btn-block"
                >
                  Empty Cart
                </Button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
