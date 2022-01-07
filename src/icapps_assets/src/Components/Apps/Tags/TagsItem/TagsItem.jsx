import React from "react";
import css from "./TagsItem.module.css";

const TagsItem = ({
  id,
  name,
  handleChange,
  checkedState,
  img,
  icon,
  emoji,
}) => {
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
            style={{
              backgroundImage: `url(${img})`,
            }}
            className={css.tagImg}
          />
        ) : icon ? (
          icon
        ) : (
          <span>{emoji}</span>
        )}

        {name}
      </div>
    </label>
  );
};

export default TagsItem;
