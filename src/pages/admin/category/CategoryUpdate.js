import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  getCategory,
  removeCategory,
  updateCategory,
} from "../../../functions/category";
import { Button } from "antd";
import Spinner from "../../../components/spinner/Spinner";
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryUpdate = ({ history, match }) => {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  useEffect(() => {
    loadCategory();
    console.log(slug);
  }, []);

  const loadCategory = () => {
    getCategory(slug).then((category) => setCategory(category.data.name));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!category) {
      toast.error("Category is required");
      return;
    }

    if (category.length < 2) {
      toast.error("Category must be at least 2 characters long");
      return;
    }

    setLoading(true);
    try {
      const { data } = await updateCategory(user.token, slug, {
        name: category,
      });
      setLoading(false);
      setCategory("");
      toast.success(`Category ${data.name} was updated`);
      history.push("/admin/category");
    } catch (error) {
      setLoading(false);
      const { status, data } = error.response;

      if (status === 400) toast.error(data);
    }
  };

  return (
    <div className="row">
      <AdminNav selectedKeys="category" />
      <div className="m-5 col">
        <div className="row">
          <div className="col-md-4">
            <CategoryForm
              handleSubmit={handleSubmit}
              category={category}
              setCategory={setCategory}
              text="Submit"
              label="Update Category"
              isLoading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
