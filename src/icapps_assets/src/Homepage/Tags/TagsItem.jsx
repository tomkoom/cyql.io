import React from "react";
import css from "./TagsItem.module.css";

const TagsItem = ({ category, setCategory, categoryActive, icon, appsNum }) => {
  return (
    <button
      className={
        categoryActive ? `${css.tagsItem} ${css.active}` : css.tagsItem
      }
      onClick={() => setCategory(category)}
    >
      <span
        className={
          icon && categoryActive
            ? `${css.tagsItem__icon} ${css.active}`
            : icon
            ? css.tagsItem__icon
            : null
        }
      >
        {icon ? `${icon}` : null}
      </span>
      <p
        className="bodyText"
        style={categoryActive ? { textDecoration: "underline" } : null}
      >
        {category}&nbsp;
        <span className={css.tagsItem__appsNum}>&#40;{appsNum}&#41;</span>
      </p>
    </button>
  );
};

export default TagsItem;
