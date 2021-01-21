import React, { useState, useEffect } from "react";
import { Button, Popconfirm, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, emptyUserCart, saveUserAddress } from "../functions/user";
import { toast } from "react-toastify";

const { TextArea } = Input;

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("User cart checkout", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const saveAddressToDb = () => {
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

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

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    console.log("ADDRESS", address);
  };

  return (
    <div className="container-fluid">
      <div className="row p-5">
        <div className="col-md-8">
          <h3>Delivery Address</h3>
          <div className="mt-2">
            <TextArea
              showCount
              maxLength={100}
              value={address}
              onChange={handleAddressChange}
            />
          </div>
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
                disabled={!addressSaved || !products.length}
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
