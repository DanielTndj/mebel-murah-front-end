import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubsCategory } from "../functions/sub-category";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Empty, Checkbox, Button, Radio } from "antd";
import Star from "../components/forms/Star";
import Spinner from "../components/spinner/Spinner";

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
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [fabrics, setFabrics] = useState([
    "Woven",
    "Polyester",
    "CottonPolyester",
    "Oscar",
  ]);
  const [fabric, setFabric] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "White",
    "Grey",
    "Brown",
    "Red",
    "Green",
    "Blue",
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [load, setLoad] = useState(false);

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const dispatch = useDispatch();
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

  useEffect(() => {
    loadAllProducts();

    getCategories().then((res) => setCategories(res.data));
    //fetch subs category
    getSubsCategory().then((res) => setSubs(res.data));
  }, []);

  // useEffect(() => {
  //   if (products.length) {
  //     getCategories().then((res) => setCategories(res.data));
  //     //fetch subs category
  //     getSubsCategory().then((res) => setSubs(res.data));
  //   }
  // }, [products]);

  const fetchProducts = (arg) => {
    setLoad(true);
    fetchProductsByFilter(arg).then((res) => {
      setLoad(false);
      setProducts(res.data);
    });
  };

  //load products on page shop load
  const loadAllProducts = async () => {
    setLoad(true);
    getProductsByCount(12)
      .then((res) => {
        setLoad(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoad(false);
        console.log(err.message);
      });

    // try {
    //   setLoad(true);
    //   const { data } = await getProductsByCount(12);
    //   setLoad(false);
    //   setProducts(data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleSlider = (value) => {
    //update redux text state to '' (reset search input) & reset checkbox
    setCategoryIds([]);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setStar("");
    setIsActiveBtn(false);
    setSub("");
    setFabric("");
    setColor("");
    setShipping("");

    setPrice(value);
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
    setIsActiveBtn(false);
    setSub("");
    setFabric("");
    setColor("");
    setShipping("");

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
    setIsActiveBtn(false);
    setSub("");
    setFabric("");
    setColor("");
    setShipping("");

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

  //load products based on subs categories
  const showSubs = () =>
    subs.map((sub) => (
      <Button
        onClick={() => handleSub(sub)}
        key={sub._id}
        type="primary"
        size="small"
        shape="round"
        style={{ textTransform: "initial" }}
        className={`btn btn-outline-dark m-0 mr-1 mb-2 ${
          isActiveBtn && "btn-raised"
        }`}
      >
        {sub.name}
      </Button>
    ));

  const handleSub = (sub) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setFabric("");
    setColor("");
    setShipping("");

    setIsActiveBtn(!isActiveBtn);
    setSub(sub);
    fetchProducts({ sub });
  };

  //load products based on material
  const showMaterials = () =>
    fabrics.map((f, index) => (
      <Radio
        key={index}
        value={f}
        name={f}
        checked={f === fabric}
        onChange={handleFabric}
        className="mb-1"
      >
        {f}
      </Radio>
    ));

  const handleFabric = (event) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setIsActiveBtn(false);
    setSub("");
    setColor("");
    setShipping("");

    setFabric(event.target.value);
    fetchProducts({ fabric: event.target.value });
  };

  //load products based on color
  const showColors = () =>
    colors.map((c, index) => (
      <Radio
        key={index}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="mb-1"
      >
        {c}
      </Radio>
    ));

  const handleColor = (event) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setIsActiveBtn(false);
    setSub("");
    setFabric("");
    setShipping("");

    setColor(event.target.value);
    fetchProducts({ color: event.target.value });
  };

  //load products based on shipping
  const showShipping = () => (
    <>
      <Checkbox
        className="mb-1"
        onChange={handleShipping}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>
      <Checkbox
        className="mb-1"
        onChange={handleShipping}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );

  const handleShipping = (event) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setIsActiveBtn(false);
    setSub("");
    setFabric("");
    setColor("");

    setShipping(event.target.value);
    fetchProducts({ shipping: event.target.value });
  };

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

            {/* sub categories */}
            <SubMenu title={<span className="h6">Sub Categories</span>}>
              <div className="ml-4 mt-2">{showSubs()}</div>
            </SubMenu>

            {/* fabric */}
            <SubMenu title={<span className="h6">Materials</span>}>
              <div className="ml-4">{showMaterials()}</div>
            </SubMenu>

            {/* color */}
            <SubMenu title={<span className="h6">Colors</span>}>
              <div className="ml-4">{showColors()}</div>
            </SubMenu>

            {/* Shipping */}
            <SubMenu title={<span className="h6">Shipping</span>}>
              <div className="ml-4">{showShipping()}</div>
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9">
          <h3 className="pb-2 mt-4">Products</h3>
          {/* {!products && null} */}

          {products.length < 1 && (
            <Empty
              imageStyle={{
                height: 120,
              }}
              description={<span>No product found</span>}
            ></Empty>
          )}

          {/* {JSON.stringify(products)} */}
          {/* {load ? (
            <Spinner />
          ) : ( */}
            <div className="row">
              {products.map((product) => (
                <div key={product._id} className="col-md-4">
                  <ProductCard loading={false} product={product} />
                </div>
              ))}
            </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default Shop;
