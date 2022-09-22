import React from "react";
import css from "./Title.module.css";

const Title = ({ title, category }) => {
  return (
    <div className={css.titleContainer}>
      <h3 className={css.title}>{title}</h3>
      {category && <span className={css.category}>{category}</span>}
    </div>
  );
};

export default Title;
