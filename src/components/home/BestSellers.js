import React, { useState, useEffect } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import { Pagination } from "antd";
import { useStateIfMounted } from "use-state-if-mounted";

const BestSellers = () => {
  const [products, setProducts] = useStateIfMounted([]);
  const [loading, setLoading] = useStateIfMounted(false);
  const [page, setPage] = useStateIfMounted(1);
  const [productsCount, setProductsCount] = useStateIfMounted(0);

  useEffect(() => {
    loadProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadProducts = () => {
    setLoading(true);

    getProducts("sold", "desc", page)
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
    <>
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
      <div className="row">
        <div className="col-md-4 offset-md-4 text-center pt-5 pb-3">
          <Pagination
            current={page}
            total={(productsCount / 3) * 10}
            onChange={(value) => setPage(value)}
          />
        </div>
      </div>
    </>
  );
};

export default BestSellers;
