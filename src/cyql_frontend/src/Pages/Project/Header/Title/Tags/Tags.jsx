import React from "react";
import css from "./Tags.module.css";

const Tags = ({ category, tags }) => {
  return (
    <ul className={css.tags}>
      {category.length > 0 &&
        category.map((c) => (
          <li className={css.tagsI} key={c}>
            {c}
          </li>
        ))}
      {tags && <span className={css.tagsI}>{tags}</span>}
    </ul>
  );
};

export default Tags;
