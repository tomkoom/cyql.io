import React from "react";
import css from "./SearchBar.module.css";

// state
import { useDispatch, useSelector } from "react-redux";
import { selectSearch, setSearch } from "../../../State/search";

const SearchBar = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);

  return (
    <input
      className={css.search}
      type="text"
      placeholder="Search projects"
      onChange={(e) => dispatch(setSearch(e.target.value))}
      value={search}
    />
  );
};

export default SearchBar;
