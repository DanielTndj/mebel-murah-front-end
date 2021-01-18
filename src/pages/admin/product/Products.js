import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { removeProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Empty } from "antd";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

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

  const handleRemove = (slug, setVisible) => {
    setVisible(false);

    removeProduct(user.token, slug)
      .then((res) => {
        console.log(res.data);
        toast.success(`Product ${res.data.title} was deleted`);
        loadAllProducts();
      })
      .catch((err) => {
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="row">
      <AdminNav selectedKeys="products" />
      <div className="m-5 col offset-col-3 col-md">
        <h5>All Products</h5>
        <hr className="p-2" />
        <div className="row">
          {products ? (
            products.map((product) => (
              <div key={product._id} className="col-md-3 pb-4">
                <AdminProductCard
                  product={product}
                  loading={loading}
                  handleRemove={handleRemove}
                />
              </div>
            ))
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
