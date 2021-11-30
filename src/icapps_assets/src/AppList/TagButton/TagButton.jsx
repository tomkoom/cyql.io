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
      {icon ? `${icon} ` : null}
      {category}
      <span className={css.appsNum}>{appsNum}</span>
    </button>
  );
};

export default TagButton;
