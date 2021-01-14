import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { List, Select } from "antd";
import CategoryForm from "../../../components/forms/CategoryForm";
import {
  getSubCategory,
  updateSubCategory,
} from "../../../functions/sub-category";

const SubUpdate = ({ history, match }) => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState("");
  const [parent, setParent] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const { Option } = Select;
  const { slug } = match.params;

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () =>
    getCategories().then((res) => setCategories(res.data));

  const loadSub = () => {
    getSubCategory(slug).then((res) => {
      setName(res.data.name);
      setParent(res.data.parent);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!parent) {
      toast.error("Parent required");
      return;
    }

    if (!name) {
      toast.error("Sub category is required");
      return;
    }

    if (name.length < 2) {
      toast.error("Sub category must be at least 2 characters long");
      return;
    }

    setLoading(true);
    try {
      const { data } = await updateSubCategory(user.token, slug, {
        name,
        parent,
      });
      setLoading(false);
      setName("");
      toast.success(`Sub category ${data.name} was updated`);
      history.push("/admin/sub-category");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="row">
      <AdminNav selectedKeys="subcategory" />
      <div className="m-5 col">
        <h5>Update Sub Category</h5>
        <hr className="p-2" />
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label className="mr-2">Name of Sub Category</label>
              <select
                className="custom-select"
                onChange={(event) => setParent(event.target.value)}
              >
                {categories.length > 0 &&
                  categories.map((category) => (
                    <option
                      key={category._id}
                      value={category._id}
                      selected={category._id === parent}
                    >
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>

            <CategoryForm
              handleSubmit={handleSubmit}
              category={name}
              setCategory={setName}
              text="Submit"
              label="Update Sub Category"
              isLoading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
