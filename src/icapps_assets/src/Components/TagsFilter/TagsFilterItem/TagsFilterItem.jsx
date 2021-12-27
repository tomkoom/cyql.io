import React from "react";
import css from "./TagsFilterItem.module.css";

const TagsFilterItem = ({ id, value, handleChange }) => {
  return (
    <div className={css.tagsFilter__item}>
      <input
        id={id}
        value={value}
        type="checkbox"
        name="tag"
        onChange={handleChange}
      />
      <label htmlFor={id}>{value}</label>
    </div>
  );
};

export default TagsFilterItem;
