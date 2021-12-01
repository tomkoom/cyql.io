import React from "react";
import css from "./TagButton.module.css";

const TagButton = ({
  category,
  handleSetCategory,
  categoryActive,
  icon,
  appsNum,
}) => {
  return (
    <button
      className={`${css.tags__item} ${
        categoryActive ? css.tags__item__active : null
      }`}
      onClick={() => handleSetCategory(category)}
    >
      <span className={icon ? css.tags__item__icon : null}>
        {icon ? `${icon}` : null}
      </span>
      {category}
      &nbsp;{" "}
      <span className={css.tags__item__appsNum}>&#40;{appsNum}&#41;</span>
    </button>
  );
};

export default TagButton;
