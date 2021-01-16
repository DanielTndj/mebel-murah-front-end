import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
import { getCategories, getSubsCategory } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import Spinner from "../../../components/spinner/Spinner";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "White", "Grey", "Brown", "Red", "Green", "Blue"],
  fabrics: ["Woven", "Polyester", "CottonPolyester", "Oscar"],
  color: "",
  fabric: "",
};

const ProductUpdate = ({ history, match }) => {
  const [values, setValues] = useState(initialState);
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loadImage, setLoadImage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug)
      .then((res) => {
        //load single product
        setValues({ ...values, ...res.data });
        //load single product subs category
        getSubsCategory(res.data.category._id).then((dt) => {
          //of first load, show default subs
          setSubOptions(dt.data);
        });
        //get array of sub category id and push to array (as default value ant design select)
        let defaultValueIds = [];
        res.data.subs.map((sub) => {
          defaultValueIds.push(sub._id);
        });

        setArrayOfSubIds((prev) => defaultValueIds);
      })
      .catch((error) => console.log(error));
  };

  const loadCategories = () =>
    getCategories().then((res) => setCategories(res.data));

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubIds;
    // if user change category then pass the selected (new), if not change the default category send the default
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(user.token, slug, values)
      .then((res) => {
        setLoading(false);
        toast.success(`Product ${res.data.title} successfully updated`);
        history.push("/admin/products");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    // console.log(event.target.name + "---" + event.target.value);
  };

  const handleCategoryChange = (event) => {
    event.preventDefault();
    let { value } = event.target;

    console.log("CLICKED CATEGORY", value);
    setValues({ ...values, subs: [] });

    setSelectedCategory(value);

    getSubsCategory(value).then((res) => setSubOptions(res.data));
    console.log("EXISTING CATEGORY", values.category);

    // if admin click back to original category then show default subs which already picked
    if (values.category._id === value) {
      loadProduct();
    }

    setArrayOfSubIds([]);
  };

  return (
    <div className="row">
      <AdminNav selectedKeys="product" />
      <div className="m-5 col">
        <h5>Product Update</h5>
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
            <ProductUpdateForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              values={values}
              setValues={setValues}
              handleCategoryChange={handleCategoryChange}
              categories={categories}
              subOptions={subOptions}
              arrayOfSubIds={arrayOfSubIds}
              setArrayOfSubIds={setArrayOfSubIds}
              selectedCategory={selectedCategory}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
