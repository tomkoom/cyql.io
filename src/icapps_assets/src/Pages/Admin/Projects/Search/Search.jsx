import React from "react";
import css from "./Search.module.css";

const Search = ({ setSearch }) => {
  const setSearchQ = (e) => {
    setSearch(e.target.value);
  };

  return (
    <input
      className={css.search}
      type="text"
      placeholder="Search by project name"
      onChange={setSearchQ}
    />
  );
};

export default Search;
