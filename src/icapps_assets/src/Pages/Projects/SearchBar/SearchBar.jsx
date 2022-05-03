import React from "react";
import css from "./SearchBar.module.css";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// state
import { useDispatch, useSelector } from "react-redux";
import { selectSearch, setSearch } from "../../../State/search";

const SearchBar = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);

  return (
    <div className={css.search}>
      <input
        className={css.search__input}
        type="text"
        placeholder="Search projects"
        onChange={(e) => dispatch(setSearch(e.target.value))}
        value={search}
      />
      <FontAwesomeIcon className={css.searchIcon} icon={faSearch} />
    </div>
  );
};

export default SearchBar;
