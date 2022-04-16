import React from "react";
import css from "./SearchBar.module.css";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ searchValue, search, inputName }) => {
  return (
    <div className={css.search}>
      <input
        className={css.search__input}
        type="text"
        placeholder="Search projects"
        onChange={search}
        value={searchValue}
        name={inputName}
      />

      <FontAwesomeIcon className={css.searchIcon} icon={faSearch} />
    </div>
  );
};

export default SearchBar;
