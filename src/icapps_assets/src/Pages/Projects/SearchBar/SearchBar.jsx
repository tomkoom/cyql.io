import React from "react";
import css from "./SearchBar.module.css";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// state
import { useDispatch } from "react-redux";
import { setSearch } from "../../../State/search";

const SearchBar = () => {
  const dispatch = useDispatch();

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
