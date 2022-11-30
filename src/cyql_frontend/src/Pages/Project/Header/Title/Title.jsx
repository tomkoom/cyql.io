import React from "react";
import css from "./Title.module.css";

const Title = ({ name, category, tags }) => {
  return (
    <div className={css.title}>
      <h3>{name}</h3>

      <div className={css.tags}>
        {category && <span className={css.tagsI}>{category}</span>}
        {tags && <span className={css.tagsI}>{tags}</span>}
      </div>
    </div>
  );
};

export default Title;
