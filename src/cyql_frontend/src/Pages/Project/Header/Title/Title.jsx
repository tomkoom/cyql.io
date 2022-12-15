import React from "react";
import css from "./Title.module.css";

// components
import { Name } from "./index";

const Title = ({ name, category, tags, grantee }) => {
  return (
    <div className={css.title}>
      <Name name={name} grantee={grantee} />

      <div className={css.tags}>
        {category.length > 0 &&
          category.map((c) => (
            <span className={css.tagsI} key={c}>
              {c}
            </span>
          ))}
        {tags && <span className={css.tagsI}>{tags}</span>}
      </div>
    </div>
  );
};

export default Title;
