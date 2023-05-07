import React from "react";
import css from "./Search.module.css";

const Search = ({ placeholder, searchQuery, setSearch }) => {
  return (
    <input
      className={css.search}
      type="text"
      placeholder={placeholder}
      onChange={setSearch}
      value={searchQuery}
    />
  );
};

export default Search;
