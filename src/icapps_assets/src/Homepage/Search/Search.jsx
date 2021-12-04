import React from "react";
import css from "./Search.module.css";

const Search = ({ setSearch, data, loading }) => {
  return (
    <div className={css.search}>
      <input
        className={css.search__input}
        type="text"
        placeholder={loading ? "" : `Search ${data[0].data.length} projects`}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
