import React from "react";
import css from "./Category.module.css";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setCategory, selectCategory } from "../../../../State/category";
import { selectProjects } from "../../../../State/projects";

const CategoryBtnsItem = ({ categoryName, icon }) => {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);
  const projects = useSelector(selectProjects);

  return (
    <button
      className={category === categoryName ? `${css.category} ${css.active}` : css.category}
      onClick={() => dispatch(setCategory(categoryName))}
    >
      {icon && <span className={css.category__icon}>{icon}</span>}
      {categoryName}
      <span className={css.category__projectsNum}>
        {categoryName === "All"
          ? projects.length
          : projects.filter((p) => p.category === categoryName).length}
      </span>
    </button>
  );
};

export default CategoryBtnsItem;
