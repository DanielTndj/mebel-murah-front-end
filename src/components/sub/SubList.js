import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubsCategory } from "../../functions/sub-category";
import { Empty, Button } from "antd";
import Spinner from "../spinner/Spinner";

const SubList = ({ title }) => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getSubsCategory()
      .then((res) => {
        setLoading(false);
        setSubs(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  const showSubs = () =>
    subs.map((sub) => (
      <Button
        key={sub._id}
        type="primary"
        size="middle"
        shape="round"
        className="btn btn-outline-dark btn-raised mr-3 mb-3"
      >
        <Link to={`/sub/${sub.slug}`}>{sub.name}</Link>
      </Button>
    ));

  return (
    <div className="container">
      <h3 className="pt-5 pb-2">{title}</h3>
      <div className="row">
        <div className="col">{loading ? <Spinner /> : showSubs()}</div>
      </div>
    </div>
  );
};

export default SubList;
