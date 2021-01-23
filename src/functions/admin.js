import axios from "axios";

export const getOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: {
      authtoken,
    },
  });

export const changeStatus = async (orderId, orderStatus, orderedBy, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus, orderedBy },
    {
      headers: {
        authtoken,
      },
    }
  );
