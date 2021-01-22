import React, { useState, useEffect } from "react";
import { Button, Popconfirm, Input, Alert } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
} from "../functions/user";
import { toast } from "react-toastify";

const { TextArea } = Input;

const Checkout = ({history}) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");
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
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is empty. Continue shopping.");
    });
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    console.log("ADDRESS", address);
  };

  const applyDiscountCoupon = () => {
    applyCoupon(user.token, coupon).then((res) => {
      if (res.data) {
        console.log("resdata", res.data);
        setTotalAfterDiscount(res.data);
        //update redux coupon applied
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }

      if (res.data.err) {
        setDiscountError(res.data.err);
        //update redux coupon applied
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
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
            className="btn btn-outline-dark btn-raised mb-5"
          >
            Save
          </Button>
          <h5 className="mb-3" style={{ fontWeight: 500 }}>
            Got Coupon?
          </h5>
          {discountError && (
            <Alert message={discountError} type="error" className="mt-2" />
          )}
          <div className="form-group mt-3">
            <Input
              style={{ width: "200px" }}
              value={coupon}
              onChange={(event) => {
                setCoupon(event.target.value);
                setDiscountError("");
              }}
            />
          </div>
          <Button
            onClick={applyDiscountCoupon}
            type="primary"
            size="middle"
            className="btn btn-secondary mb-5"
          >
            Apply
          </Button>
        </div>
        <div className="col-md-4 ">
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

          {totalAfterDiscount > 0 && (
            <div>
              <Alert
                message={`Total Payment After Discount: IDR ${totalAfterDiscount}`}
                type="success"
              />
            </div>
          )}

          <div className="row pt-3">
            <div className="col-md">
              <Button
                type="primary"
                size="middle"
                className="btn btn-warning btn-raised btn-block"
                disabled={!addressSaved || !products.length}
                onClick={() => history.push("/payment")}
              >
                Place Order
              </Button>
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
