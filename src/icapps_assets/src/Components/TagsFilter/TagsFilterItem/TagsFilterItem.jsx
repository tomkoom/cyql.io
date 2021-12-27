import React from "react";
import css from "./TagsFilterItem.module.css";

const TagsFilterItem = ({ id, name, handleChange, checkedState }) => {
  return (
    <div className={css.tagsFilter__item}>
      <input
        id={id}
        value={name}
        type="checkbox"
        name="tag"
        onChange={handleChange}
        checked={checkedState}
      />
      <label htmlFor={id}>{name}</label>
    </div>
  );
};

export default TagsFilterItem;
