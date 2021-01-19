import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Empty } from "antd";
import { DollarOutlined } from "@ant-design/icons";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const dispatch = useDispatch();

  useEffect(() => {
    loadAllProducts();
  }, []);

  const fetchProducts = (arg) => {
    // setLoading(true);
    fetchProductsByFilter(arg).then((res) => {
      // setLoading(false);
      setProducts(res.data);
    });
  };

  //load products on page shop load
  const loadAllProducts = () => {
    // setLoading(true);

    getProductsByCount(12).then((res) => {
      // setLoading(false);
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

  // load products based on price range
  useEffect(() => {
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    //update redux text state to '' (reset search input)
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div className="container-fluid pt-5">
      <div className="row">
        <div className="col-md-3">
          <h4 className="pb-2 ml-4" style={{ fontWeight: "400" }}>
            Search
          </h4>
          <Menu defaultOpenKeys={["1"]} mode="inline">
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `IDR ${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="20000000"
                />
              </div>
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9">
          <h3 className="pb-2 mt-4">Products</h3>

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
