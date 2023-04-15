import React from "react";
import css from "./Tags.module.css";

const Tags = ({ category }) => {
  return (
    <ul className={css.tags}>
      {category.length > 0 && category.map((c) => <li key={c.toLowerCase()}>{c.toLowerCase()}</li>)}
    </ul>
  );
};

export default Tags;
