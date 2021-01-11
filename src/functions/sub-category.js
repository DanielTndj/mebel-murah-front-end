import axios from "axios";

export const getSubsCategory = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subs`);

export const getSubCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

export const removeSubCategory = async (authtoken, slug) =>
  await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateSubCategory = async (authtoken, slug, sub) =>
  await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });

export const createSubCategory = async (authtoken, sub) =>
  await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
    headers: {
      authtoken,
    },
  });
