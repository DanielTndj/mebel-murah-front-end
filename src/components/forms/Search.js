import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

const { Search } = Input;

const SearchForm = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const history = useHistory();

  const handleChange = (event) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: event.target.value },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    history.push(`/shop?${text}`);
  };

  const style = ()=>{

  }

  return (
    <form className="form-inline" onSubmit={handleSubmit}>
      <input
        type="search"
        value={text}
        className="form-control"
        placeholder="Search"
        onChange={handleChange}
      />
      <SearchOutlined
        onClick={handleSubmit}
        className='custom-search'
      />
    </form>
    // <Search placeholder="input search text" onSearch={handleChange} enterButton />
  );
};

export default SearchForm;
