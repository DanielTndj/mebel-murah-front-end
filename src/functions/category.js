import axios from "axios";

export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`);

export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

export const removeCategory = async (authtoken, slug) =>
  await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateCategory = async (authtoken, slug, category) =>
  await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
    headers: {
      authtoken,
    },
  });

export const createCategory = async (authtoken, category) =>
  await axios.post(`${process.env.REACT_APP_API}/category `, category, {
    headers: {
      authtoken,
    },
  });
