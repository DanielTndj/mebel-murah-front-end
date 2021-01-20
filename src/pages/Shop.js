import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Empty, Checkbox } from "antd";
import Star from "../components/forms/Star";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  // show categories option on checkbox
  const [categories, setCategories] = useState([]);
  // send categories selected to backend
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const dispatch = useDispatch();

  useEffect(() => {
    loadAllProducts();
    //fetch categories
    getCategories().then((res) => setCategories(res.data));
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  //load products on page shop load
  const loadAllProducts = () => {
    // setLoading(true);
    getProductsByCount(12).then((res) => {
      setProducts(res.data);
      setLoading(false);
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
    //update redux text state to '' (reset search input) & reset checkbox
    setCategoryIds([]);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice(value);
    setStar("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // load products based on categories
  // show each category in a list of checkbox
  const showCategories = () =>
    categories.map((category) => (
      <div key={category._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={category._id}
          name="category"
          checked={categoryIds.includes(category._id)}
        >
          {category.name}
        </Checkbox>
        <br />
      </div>
    ));

  const handleCheck = (event) => {
    //reset value on state
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    // console.log(event.target.value)
    let inTheState = [...categoryIds];
    let justChecked = event.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); //return true/-1

    // item haven't checked by user
    if (foundInTheState === -1) {
      // push new value
      inTheState.push(justChecked);
    } else {
      //found same item, pull the item from arr
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  // load products based on average of star
  const handleStarClick = (num) => {
    // console.log("STARS", num);
    //reset value on state
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  return (
    <div className="container-fluid pt-5">
      <div className="row">
        <div className="col-md-3">
          <h4 className="pb-2 ml-4" style={{ fontWeight: "400" }}>
            Search By
          </h4>
          <Menu mode="inline">
            {/* price */}
            <SubMenu title={<span className="h6">Price</span>}>
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

            {/* categories */}
            <SubMenu title={<span className="h6">Categories</span>}>
              <div>{showCategories()}</div>
            </SubMenu>

            {/* stars */}
            <SubMenu title={<span className="h6">Rating</span>}>
              <div>{showStars()}</div>
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
