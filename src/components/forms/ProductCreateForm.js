import React from "react";
import { Button, Select } from "antd";
import Spinner from "../../components/spinner/Spinner";

const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  handleCategoryChange,
  values,
  setValues,
  subOptions,
  showSub,
}) => {
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    fabrics,
    color,
    fabric,
    loading,
  } = values;

  return (
    <form onSubmit={handleSubmit} id="productForm">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          id="title"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          id="description"
          value={description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          id="price"
          value={price}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Shipping</label>
        <select
          name="shipping"
          className="custom-select"
          onChange={handleChange}
        >
          <option value="default">Select shipping</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          id="quantity"
          value={quantity}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Color</label>
        <select name="color" className="custom-select" onChange={handleChange}>
          <option value="default">Select a color</option>
          {colors &&
            colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label>Fabric</label>
        <select name="fabric" className="custom-select" onChange={handleChange}>
          <option value="default">Select a fabric</option>
          {fabrics &&
            fabrics.map((fabric) => (
              <option key={fabric} value={fabric}>
                {fabric}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label>Select Category</label>
        <select
          name="category"
          className="custom-select"
          onChange={handleCategoryChange}
        >
          <option value="default">Category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      {showSub && (
        <div className="form-group">
          <label>Select Sub Categories</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            value={subs}
            onChange={(value) => setValues({ ...values, subs: value })}
          >
            {subOptions.length &&
              subOptions.map((option) => (
                <Option key={option._id} value={option._id}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </div>
      )}

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
          Submit
        </Button>
      )}
    </form>
  );
};

export default ProductCreateForm;
