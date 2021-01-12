import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import {
  List,
  Divider,
  Tooltip,
  Popconfirm,
  Input,
  Select,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import {
  createSubCategory,
  getSubsCategory,
  removeSubCategory,
} from "../../../functions/sub-category";

const SubCreate = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState("");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [subs, setSubs] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const { Item } = List;
  const { Option } = Select;

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((res) => setCategories(res.data));

  const loadSubs = () => {
    getSubsCategory().then((res) => setSubs(res.data));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!category) {
      toast.error("Main category is required");
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
      const { data } = await createSubCategory(user.token, {
        name,
        parent: category,
      });
      setLoading(false);
      setName("");
      toast.success(`Sub category ${data.name} was created`);
      loadSubs();
    } catch (error) {
      setLoading(false);
      const { status, data } = error.response;

      if (status === 400) toast.error(data);
    }
  };

  const deleteSubCategory = (slug) => {
    // setLoading(false);
    removeSubCategory(user.token, slug)
      .then((res) => {
        // setLoading(true);
        toast.success(`Sub category ${res.data.name} successfully deleted`);
        loadSubs();
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
      <AdminNav selectedKeys="subcategory" />
      <div className="m-5 col">
        <div className="row">
          <div className="col-md-4">
            <label className="mr-2">Choose Main Category</label>
            <div className="form-group">
              <select
                className="custom-select"
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="">Select category</option>
                {categories.length > 0 &&
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>

            <CategoryForm
              handleSubmit={handleSubmit}
              category={name}
              setCategory={setName}
              text="Create"
              label="New Sub Category"
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
            {subs.filter(searched(keyword)).map((item) => (
              <div key={item._id} style={{ height: "35px" }}>
                <Item
                  actions={[
                    <Tooltip title="Edit category" placement="bottomRight">
                      <Link to={`/admin/sub-category/${item.slug}`}>
                        <EditOutlined className="text-secondary" />
                      </Link>
                    </Tooltip>,
                    <Popconfirm
                      title="Are you sure to delete this category"
                      onConfirm={() => deleteSubCategory(item.slug)}
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
                <hr
                  style={{
                    position: "relative",
                    top: "-20px",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
