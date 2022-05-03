import React from "react";
import css from "./Category.module.css";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setCategory, selectCategory } from "../../../../State/category";

const CategoryBtnsItem = ({ categoryName, icon, categoryLength }) => {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);

  return (
    <button
      className={category === categoryName ? `${css.category} ${css.active}` : css.category}
      onClick={() => dispatch(setCategory(categoryName))}
    >
      {icon && <span className={css.category__icon}>{icon}</span>}
      {categoryName}
      <span className={css.category__projectsNum}>{categoryLength}</span>
    </button>
  );
};

export default CategoryBtnsItem;
