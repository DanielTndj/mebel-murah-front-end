import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getSubsCategory } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import Spinner from "../../../components/spinner/Spinner";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "White", "Grey", "Brown", "Red", "Green", "Blue"],
  fabrics: ["Woven", "Polyester", "CottonPolyester", "Oscar"],
  color: "",
  fabric: "",
  loading: false,
};

const ProductCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loadImage, setLoadImage] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((res) =>
      setValues({ ...values, categories: res.data })
    );

  const handleSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, loading: true });
    createProduct(user.token, values)
      .then((res) => {
        setValues({
          ...values,
          // title: "",
          // description: "",
          // price: "",
          // shipping: "",
          // quantity: "",
          // color: "",
          // fabric: "",
          // category: "",
          // subs: [],
          // showSub: false,
          loading: false,
        });
        toast.success(`Product ${res.data.title} successfully created`);
        setTimeout(() => {
          window.location.reload();
        }, 150);
      })
      .catch((err) => {
        setValues({ ...values, loading: false });
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    // console.log(event.target.name + "---" + event.target.value);
  };

  const handleCategoryChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setValues({ ...values, subs: [], category: value });

    getSubsCategory(value).then((res) => setSubOptions(res.data));

    setShowSub(true);
  };

  return (
    <div className="row">
      <AdminNav selectedKeys="product" />
      <div className="m-5 col">
        <h5>Create New Product</h5>
        <hr className="p-2" />
        <div className="row">
          <div className="col-md-12">
            {loadImage && (
              <div className="pb-4">
                <Spinner />
              </div>
            )}

            <FileUpload
              values={values}
              setValues={setValues}
              setLoadImage={setLoadImage}
            />
            <ProductCreateForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleCategoryChange={handleCategoryChange}
              values={values}
              setValues={setValues}
              subOptions={subOptions}
              showSub={showSub}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
