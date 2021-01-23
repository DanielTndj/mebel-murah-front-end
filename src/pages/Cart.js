import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Empty, Button } from "antd";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const showCartItems = () => (
    <>
      <table className="table table-responsive w-100">
        <thead className="thead-light">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Material</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        {cart.map((item) => (
          <ProductCardInCheckout key={item._id} product={item} />
        ))}
      </table>
    </>
  );

  const getTotal = () => {
    return cart.reduce((curr, next) => {
      return curr + next.count * next.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    userCart(cart, user.token)
      .then((res) => {
        console.log(res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const saveCashOrderToDb = () => {
    dispatch({
      type: "COD",
      payload: true,
    });

    userCart(cart, user.token)
      .then((res) => {
        console.log(res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  return (
    <div className="container-fluid">
      <div className="row p-5">
        <div className="col-lg-8">
          <h3>Cart</h3>
          {!cart.length ? (
            <Empty
              imageStyle={{
                height: 60,
              }}
              description={<span>No product in cart.</span>}
            >
              <Link to="/shop">
                <Button type="primary">Continue Shopping</Button>
              </Link>
            </Empty>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-lg-4 pt-5">
          <h5>Order Summary</h5>
          <hr />
          <p style={{ fontSize: "1rem" }}>Products</p>
          {cart.map((item, index) => (
            <div key={index}>
              <p style={{ fontSize: "1rem" }}>
                {item.title} x {item.count} = IDR {item.price * item.count}
              </p>
            </div>
          ))}
          <hr />
          <p style={{ fontSize: "1rem" }}>
            Total:<strong> IDR {getTotal()}</strong>
          </p>
          <hr />
          {user ? (
            <>
              <Button
                onClick={saveOrderToDb}
                className="my-2 btn btn-warning btn-raised btn-block"
                disabled={!cart.length}
              >
                Checkout
              </Button>
              <br />
              <Button
                onClick={saveCashOrderToDb}
                className="mt-2 btn btn-outline-dark btn-raised btn-block"
                disabled={!cart.length}
              >
                Pay Cash on Delivery
              </Button>
            </>
          ) : (
            <Link
              to={{
                pathname: "/login",
                state: { from: "cart" },
              }}
            >
              <Button className="my-2 btn btn-outline-dark btn-raised">
                Login to Checkout
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
