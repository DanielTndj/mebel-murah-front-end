import { Input } from "antd";
import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearch = (event) => {
    event.preventDefault();
    const { value } = event.target;

    setKeyword(value.toLowerCase());
  };

  return (
    <div className="row pb-2 d-flex justify-content-end">
      <div className="col-md-4">
        <Input
          type="text"
          placeholder="Search..."
          className="text-secondary"
          style={{ borderRadius: "150px" }}
          value={keyword}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default LocalSearch;
