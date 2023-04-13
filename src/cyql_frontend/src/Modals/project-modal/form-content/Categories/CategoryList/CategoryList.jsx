import React from "react";
import css from "./CategoryList.module.css";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectCategories } from "@state/modals/categories";
import { selectProjectCategory, setProjectCategory } from "@state/modals/projectModal/projectModal";

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const projectCategory = useSelector(selectProjectCategory);
  const projectCategoryCopy = [...projectCategory];

  const updateCategory = (category) => {
    if (projectCategoryCopy.includes(category)) {
      const index = projectCategoryCopy.indexOf(category);
      projectCategoryCopy.splice(index, 1);
    } else {
      projectCategoryCopy.push(category);
    }
    dispatch(setProjectCategory(projectCategoryCopy));
  };

  return (
    <ul className={css.categoryList}>
      {categories
        .filter((category) => category.id !== "all")
        .map((category) => (
          <li
            className={
              projectCategoryCopy.includes(category.label)
                ? `${css.categoryListI} ${css.selected}`
                : css.categoryListI
            }
            key={category.id}
            onClick={() => updateCategory(category.label)}
          >
            {category.label}
          </li>
        ))}
    </ul>
  );
};

export default CategoryList;
