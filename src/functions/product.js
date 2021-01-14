import axios from "axios";

export const createProduct = async (authtoken, product) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });



