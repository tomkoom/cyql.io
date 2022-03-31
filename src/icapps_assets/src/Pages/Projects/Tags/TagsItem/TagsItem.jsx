import React from "react";
import css from "./TagsItem.module.css";

const TagsItem = ({ id, name, handleChange, checkedState, img, icon }) => {
  return (
    <label className={css.tagsItem} htmlFor={id}>
      <input
        id={id}
        value={name}
        type="checkbox"
        name="tag"
        onChange={handleChange}
        checked={checkedState}
      />
      <div className={css.tagsItem__content}>
        {img ? (
          <div
            className={css.tagImg}
            style={{
              backgroundImage: `url(${img})`,
            }}
          />
        ) : (
          icon
        )}
        {name}
      </div>
    </label>
  );
};

export default TagsItem;
