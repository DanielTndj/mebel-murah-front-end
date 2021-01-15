import { Progress, Skeleton } from "antd";
import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);

    getProductsByCount(100)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="row">
      <AdminNav selectedKeys="products" />

      <div className="m-5 col offset-col-3 col-md">
          <h5>All Products</h5>
          <hr className="p-2" />
        <div className="row">
          {/* {loading ? (
            <div>
              <Skeleton active />
              <Skeleton active />
            </div>
          ) : ( */}
            {products.map((product) => (
              <div key={product._id} className="col-md-3 pb-4">
                <AdminProductCard product={product} loading={loading}/>
              </div>
            ))}
          {/* // )} */}
        </div>
      </div>
    </div>
  );
};

export default Products;
