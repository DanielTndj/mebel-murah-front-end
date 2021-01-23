import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";
import "../stripe.css";

//load stripe from outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  return (
    <div className="container-fluid">
      <Elements stripe={promise}>
        <div className="row p-5 d-flex justify-content-center">
          <div className="col-md-8">
            <h3 className="text-center mb-5">Complete Your Purchase</h3>
            <StripeCheckout />
          </div>
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
