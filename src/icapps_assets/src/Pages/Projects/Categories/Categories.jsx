import React from "react";
import css from "./Categories.module.css";
import Category from "./Category/Category";

// state
import { useSelector } from "react-redux";
import { selectCategories } from "../../../State/categories";
import { selectProjects } from "../../../State/projects";

const Categories = () => {
  const categories = useSelector(selectCategories);
  const projects = useSelector(selectProjects);

  return (
    <div className={css.categoryBtns}>
      {categories.map((category) => (
        <Category
          categoryName={category.name}
          icon={category.icon}
          key={category.name}
          categoryLength={
            category.name === "All"
              ? projects.length
              : projects.filter((project) => project.category === category.name).length
          }
        />
      ))}
    </div>
  );
};

export default Categories;
