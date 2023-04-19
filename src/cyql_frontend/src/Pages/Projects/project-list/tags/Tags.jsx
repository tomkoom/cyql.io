import React from "react";
import css from "./Tags.module.css";

const Tags = ({ categories }) => {
  return (
    <ul className={css.tags}>
      {categories.length > 0 &&
        categories.map((category) => (
          <li key={category.toLowerCase()}>{category.toLowerCase()}</li>
        ))}
    </ul>
  );
};

export default Tags;
