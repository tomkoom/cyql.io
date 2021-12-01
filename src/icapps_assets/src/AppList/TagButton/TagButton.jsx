import React from "react";
import css from "./TagButton.module.css";

const TagButton = ({
  category,
  setCategory,
  categoryActive,
  icon,
  appsNum,
}) => {
  return (
    <button
      className={
        categoryActive ? `${css.tags__item} ${css.active}` : css.tags__item
      }
      onClick={() => setCategory(category)}
    >
      <span
        className={
          icon && categoryActive
            ? `${css.tags__item__icon} ${css.active}`
            : icon
            ? css.tags__item__icon
            : null
        }
      >
        {icon ? `${icon}` : null}
      </span>
      {category}&nbsp;
      <span className={css.tags__item__appsNum}>&#40;{appsNum}&#41;</span>
    </button>
  );
};

export default TagButton;
