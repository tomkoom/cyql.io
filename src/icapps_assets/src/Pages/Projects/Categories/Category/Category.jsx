import React from "react";
import css from "./Category.module.css";

const CategoryBtnsItem = ({ categoryName, setCategory, categoryActive, icon, projectsNum }) => {
  return (
    <button
      className={categoryActive ? `${css.category} ${css.active}` : css.category}
      onClick={() => setCategory(categoryName)}
    >
      {/* icon */}
      {icon && <span className={css.category__icon}>{icon}</span>}
      {/* category name */}
      {categoryName}
      {/* projects num */}
      <span className={css.category__projectsNum}>{projectsNum}</span>
    </button>
  );
};

export default CategoryBtnsItem;
