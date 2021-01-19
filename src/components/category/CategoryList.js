import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";
import { Empty, Button } from "antd";
import Spinner from "../spinner/Spinner";
import { useStateIfMounted } from "use-state-if-mounted";

const CategoryList = ({ title }) => {
  const [categories, setCategories] = useStateIfMounted([]);
  const [loading, setLoading] = useStateIfMounted(false);

  useEffect(() => {
    setLoading(true);

    getCategories()
      .then((res) => {
        setLoading(false);
        setCategories(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  const showCategories = () =>
    categories.map((category) => (
      <Button
        key={category._id}
        type="primary"
        size="middle"
        shape="round"
        className="btn btn-outline-dark btn-raised mr-3 mb-3"
      >
        <Link to={`/category/${category.slug}`}>{category.name}</Link>
      </Button>
    ));

  return (
    <div className="container">
      <h3 className="pt-5 pb-2">{title}</h3>
      <div className="row">
        <div className="col">{loading ? <Spinner /> : showCategories()}</div>
      </div>
    </div>
  );
};

export default CategoryList;
