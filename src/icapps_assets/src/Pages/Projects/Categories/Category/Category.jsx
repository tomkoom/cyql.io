import React from "react";
import css from "./Category.module.css";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setCategory, selectCategory } from "../../../../State/category";

const Category = ({ categoryName, icon, categoryLength }) => {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);

  return (
    <button
      className={category === categoryName ? `${css.category} ${css.active}` : css.category}
      onClick={() => dispatch(setCategory(categoryName))}
    >
      {icon && <span className={css.icon}>{icon}</span>}
      {categoryName}
      <span className={css.projectsNum}>{categoryLength}</span>
    </button>
  );
};

export default Category;
