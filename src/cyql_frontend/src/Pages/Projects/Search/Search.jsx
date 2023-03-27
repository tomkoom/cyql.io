import React from "react";
import css from "./Search.module.css";

// state
import { useDispatch, useSelector } from "react-redux";
import { selectSearch, setSearch } from "@state/projects/search";

const SearchBar = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);

  return (
    <input
      className={css.search}
      type="text"
      placeholder="Search by name"
      onChange={(e) => dispatch(setSearch(e.target.value))}
      value={search}
    />
  );
};

export default SearchBar;
