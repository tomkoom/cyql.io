import React from "react";
import css from "./CategoryBtnsItem.module.css";

const CategoryBtnsItem = ({
  category,
  setCategory,
  categoryActive,
  icon,
  projectsNum,
}) => {
  return (
    <button
      className={
        categoryActive ? `${css.tagsItem} ${css.active}` : css.tagsItem
      }
      onClick={() => setCategory(category)}
    >
      <span className="bodyText" style={icon ? null : { display: "none" }}>
        {icon && `${icon}`}
      </span>
      <p className="bodyText">
        {category}&nbsp;
        <span className={css.tagsItem__projectsNum}>{projectsNum}</span>
      </p>
    </button>
  );
};

export default CategoryBtnsItem;
