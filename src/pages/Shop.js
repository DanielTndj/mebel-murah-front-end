import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Empty } from "antd";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
  }, []);

  //load products on page shop load
  const loadAllProducts = () => {
    setLoading(true);

    getProductsByCount(12).then((res) => {
      setLoading(false);
      setProducts(res.data);
    });
  };

  //load products on user input (on search)
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);

    return () => clearTimeout(delayed);
  }, [text]);

  const fetchProducts = (arg) => {
    setLoading(true);

    fetchProductsByFilter(arg).then((res) => {
      setLoading(false);
      setProducts(res.data);
    });
  };

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-3">search</div>
        <div className="col-md-9">
          <h3 className="pb-2">Products</h3>

          {products.length < 1 ? (
            <Empty
              imageStyle={{
                height: 120,
              }}
              description={<span>No product found</span>}
            ></Empty>
          ) : (
            <div className="row">
              {products.map((product) => (
                <div key={product._id} className="col-md-4">
                  <ProductCard loading={loading} product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
