import React, { useState } from "react";
import css from "./Search.module.css";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = ({ setSearch, data, loading }) => {
  const [isActive, setIsActive] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

  return (
    <div className={css.search}>
      <input
        className={css.search__input}
        type="text"
        placeholder={loading ? "" : `Search ${data[0].data.length} projects`}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => {
          setIsActive(true); // true == black
        }}
        onBlur={() => {
          setIsActive(false); // false == white
        }}
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
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

export default Search;
