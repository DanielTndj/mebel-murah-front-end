import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import { Link } from "react-router-dom";
import { Empty, Button } from "antd";
import ProductCard from "../../components/cards/ProductCard";

const CategoryHome = ({ match }) => {
  const { slug } = match.params;
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getCategory(slug).then((res) => {
      setLoading(false);
      setCategory(res.data.category);
      setProducts(res.data.products);
    });
  }, []);

  return (
    <div className="container">
      <h3 className="pt-5 pb-2">
        {products.length > 0 && (
          <div>
            {products.length} Products in {category.name}
          </div>
        )}
      </h3>
      {products.length > 0 ? (
        <div className="row">
          {products.map((product) => (
            <div
              key={product._id}
              className="col-md-4"
              style={{ marginBottom: "30px" }}
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

export default CategoryHome;
