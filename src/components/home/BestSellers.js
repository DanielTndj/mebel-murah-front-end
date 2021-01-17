import React, { useState, useEffect } from "react";
import { getProducts } from "../../functions/product";
import ProductCard from "../cards/ProductCard";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);

    getProducts("sold", "desc", 3)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="container">
        <h3 className="pt-5 pb-2">Best Sellers</h3>
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4">
              <ProductCard product={product} loading={loading} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
