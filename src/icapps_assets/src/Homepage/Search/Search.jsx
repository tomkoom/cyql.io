import React from "react";
import css from "./Search.module.css";

const Search = () => {
  return (
    <div className={css.search}>
      <input type="text" placeholder="Search" />
    </div>
  );
};

export default Search;
