import React from "react";
import css from "./CategoryBtnsItem.module.css";
import { motion } from "framer-motion";

const CategoryBtnsItem = ({
  category,
  setCategory,
  categoryActive,
  icon,
  projectsNum,
}) => {
  return (
    <motion.button
      className={
        categoryActive ? `${css.tagsItem} ${css.active}` : css.tagsItem
      }
      onClick={() => setCategory(category)}
      whileTap={{ scale: 0.9 }}
    >
      <span className="bodyText" style={icon ? null : { display: "none" }}>
        {icon && `${icon}`}
      </span>
      <p className="bodyText">
        {category}&nbsp;
        <span className={css.tagsItem__projectsNum}>{projectsNum}</span>
      </p>
    </motion.button>
  );
};

export default CategoryBtnsItem;
