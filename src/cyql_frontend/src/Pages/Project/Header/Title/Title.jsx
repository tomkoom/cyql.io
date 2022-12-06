import React from "react";
import css from "./Title.module.css";

const Title = ({ name, category, tags }) => {
  return (
    <div className={css.title}>
      <h3>{name}</h3>

      <div className={css.tags}>
        <div className={css.category}>
          {category.length > 0 &&
            category.map((c) => (
              <span className={css.tagsI} key={c}>
                {c}
              </span>
            ))}
        </div>
        {tags && <span className={css.tagsI}>{tags}</span>}
      </div>
    </div>
  );
};

export default Title;
