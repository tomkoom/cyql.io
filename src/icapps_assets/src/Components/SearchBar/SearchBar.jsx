import React, { useState } from "react";
import css from "./SearchBar.module.css";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ setSearch, search, inputName }) => {
  const [isActive, setIsActive] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (props.onChange) props.onChange(search);
  };

  return (
    <div className={css.search}>
      <input
        className={css.search__input}
        type="text"
        placeholder="Search projects"
        onChange={handleSearch}
        onFocus={() => {
          setIsActive(true); // true == black
        }}
        onBlur={() => {
          setIsActive(false); // false == white
        }}
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
        value={search}
        name={inputName}
      />

      <FontAwesomeIcon
        className={css.searchIcon}
        style={
          isActive
            ? { color: "#11100f" }
            : mouseOver
            ? { color: "white" }
            : { color: "rgba(255, 255, 255, 0.33)" }
        }
        icon={faSearch}
      />
    </div>
  );
};

export default SearchBar;
