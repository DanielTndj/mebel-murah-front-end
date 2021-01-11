import { Button } from "antd";
import React from "react";
import Spinner from "../spinner/Spinner";

const CategoryForm = ({
  handleSubmit,
  category,
  setCategory,
  isLoading,
  text,
  label,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="category">{label}</label>
        <input
          type="text"
          className="form-control"
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          disabled={isLoading}
        />
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Button
          onClick={handleSubmit}
          type="primary"
          block
          shape="round"
          size="large"
        >
          {text}
        </Button>
      )}
    </form>
  );
};

export default CategoryForm;
