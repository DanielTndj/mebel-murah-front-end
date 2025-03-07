import axios from "axios";

//get client secret
export const createPaymentIntent = (authtoken, coupon) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    {couponApplied: coupon},
    {
      headers: {
        authtoken,
      },
    }
  );
