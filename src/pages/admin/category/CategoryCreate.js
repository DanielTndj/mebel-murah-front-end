import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { List, Divider, Button, Tooltip, Popconfirm } from "antd";
import Spinner from "../../../components/spinner/Spinner";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const CategoryCreate = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState("");
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
      toast.error("Category is required");
      return;
    }

    if (category.length < 2) {
      toast.error("Category must be at least 2 characters long");
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

  const categoryForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Enter new category</label>
          <input
            type="category"
            className="form-control"
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            disabled={loading}
            autoFocus
          />
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <Button
            onClick={handleSubmit}
            type="primary"
            block
            shape="round"
            size="large"
          >
            Add Category
          </Button>
        )}
      </form>
    );
  };

  return (
    <div className="row">
      <AdminNav selectedKeys="category" />
      <div className="m-5 col">
        <div className="row">
          <div className="col-md-4">{categoryForm()}</div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Divider orientation="center">Categories</Divider>
            <List
              itemLayout="horizontal"
              bordered
              dataSource={categories}
              renderItem={(item) => (
                <Item
                  actions={[
                    <Tooltip title="Edit category" placement="bottomRight">
                      <Link to={`/admin/category/${item.slug}`}>
                        <EditOutlined className="text-secondary" />
                      </Link>
                    </Tooltip>,
                    <Popconfirm
                      title="Are you sure to delete this category"
                      onConfirm={() => deleteCategory(item.slug)}
                      onCancel={() => console.log("cancelled")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Tooltip title="Delete category" placement="bottomRight">
                        <DeleteOutlined className="text-danger" />
                      </Tooltip>
                    </Popconfirm>,
                  ]}
                >
                  {item.name}
                </Item>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
