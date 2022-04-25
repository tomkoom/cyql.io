import React from "react";
import css from "./SearchBar.module.css";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  return (
    <div className={css.search}>
      <input
        className={css.search__input}
        type="text"
        placeholder="Search projects"
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
      <FontAwesomeIcon className={css.searchIcon} icon={faSearch} />
    </div>
  );
};

export default SearchBar;
