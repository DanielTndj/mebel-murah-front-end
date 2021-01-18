import React, { useState, useEffect } from "react";
import { getSubCategory } from "../../functions/sub-category";
import { Link } from "react-router-dom";
import { Empty, Button } from "antd";
import ProductCard from "../../components/cards/ProductCard";

const SubHome = ({ match }) => {
  const { slug } = match.params;
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getSubCategory(slug).then((res) => {
      setLoading(false);
      setSub(res.data.sub);
      setProducts(res.data.products);
    });
  }, []);

  return (
    <div className="container">
      <h3 className="pt-5 pb-2">
        {products.length > 0 && (
          <div>
            {products.length} Products in {sub.name} Sub Category
          </div>
        )}
      </h3>
      {products.length > 0 ? (
        <div className="row">
          {products.map((product) => (
            <div
              key={product._id}
              className="col-md-4"
            >
              <ProductCard loading={loading} product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="row d-flex justify-content-center">
          <div className="col">
            <Empty
              imageStyle={{
                height: 60,
              }}
              description={<span>0 Product found</span>}
            >
              <Link to="/">
                <Button type="primary">Back to Home</Button>
              </Link>
            </Empty>
            ,
          </div>
        </div>
      )}
    </div>
  );
};

export default SubHome;
