import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { List, Divider, Tooltip, Popconfirm, Empty } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState("");
  const [keyword, setKeyword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const { Item } = List;

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((res) => setCategories(res.data));

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!category) {
      toast.error("Main category is required");
      return;
    }

    if (category.length < 2) {
      toast.error("Main category must be at least 2 characters long");
      return;
    }

    setLoading(true);
    try {
      const { data } = await createCategory(user.token, { name: category });
      setLoading(false);
      setCategory("");
      toast.success(`Category ${data.name} was created`);
      loadCategories();
    } catch (error) {
      setLoading(false);
      const { status, data } = error.response;

      if (status === 400) toast.error(data);
    }
  };

  const deleteCategory = (slug) => {
    // setLoading(false);
    console.log(user.token);
    console.log(slug);
    removeCategory(user.token, slug)
      .then((res) => {
        // setLoading(true);
        toast.success(`Category ${res.data.name} successfully deleted`);
        loadCategories();
      })
      .catch((error) => {
        const { status, data } = error.response;
        // setLoading(true);

        if (status === 400) toast.error(data);
      });
  };

  const searched = (keyword) => (category) =>
    category.name.toLowerCase().includes(keyword);

  return (
    <div className="row">
      <AdminNav selectedKeys="category" />
      <div className="m-5 col">
        <h5>Create New Category</h5>
        <hr className="p-2" />
        <div className="row">
          <div className="col-md-4">
            <CategoryForm
              handleSubmit={handleSubmit}
              category={category}
              setCategory={setCategory}
              text="Create"
              label="Name of category"
              isLoading={loading}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Divider orientation="center">Categories</Divider>
          </div>
        </div>
        <LocalSearch keyword={keyword} setKeyword={setKeyword} />
        <div className="row">
          <div className="col-md-12">
            {categories ? (
              categories.filter(searched(keyword)).map((item) => (
                <div key={item._id} style={{ height: "35px" }}>
                  <Item
                    actions={[
                      <Tooltip title="Edit category" placement="bottomRight">
                        <Link to={`/admin/category/${item.slug}`}>
                          <EditOutlined className="text-secondary" />
                        </Link>
                      </Tooltip>,
                      <Popconfirm
                        title="Are you sure to delete this category?"
                        onConfirm={() => deleteCategory(item.slug)}
                        onCancel={() => console.log("cancelled")}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Tooltip
                          title="Delete category"
                          placement="bottomRight"
                        >
                          <DeleteOutlined className="text-danger" />
                        </Tooltip>
                      </Popconfirm>,
                    ]}
                  >
                    {item.name}
                  </Item>
                  <hr
                    style={{
                      position: "relative",
                      top: "-20px",
                    }}
                  />
                </div>
              ))
            ) : (
              <Empty />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
