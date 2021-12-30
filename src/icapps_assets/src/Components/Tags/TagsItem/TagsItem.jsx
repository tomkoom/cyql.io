import React from "react";
import css from "./TagsItem.module.css";
import { motion } from "framer-motion";

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
    <motion.label
      className={css.tagsItem}
      htmlFor={id}
      whileTap={{ scale: 0.9 }}
    >
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
    </motion.label>
  );
};

export default TagsItem;
