import React from "react";
import css from "./CategoryList.module.css";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectAllCategories } from "@state/categories/allCategories";
import {
  selectProjectCategories,
  setProjectCategories,
} from "@state/modals/projectModal/projectModal";

const CategoryList = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector(selectAllCategories);
  const projectCategories = useSelector(selectProjectCategories);
  const projectCategoriesCopy = [...projectCategories];

  const updateCategory = (category) => {
    if (projectCategoriesCopy.includes(category)) {
      const index = projectCategoriesCopy.indexOf(category);
      projectCategoriesCopy.splice(index, 1);
    } else {
      projectCategoriesCopy.push(category);
    }
    dispatch(setProjectCategories(projectCategoriesCopy));
  };

  return (
    <ul className={css.categoryList}>
      {allCategories
        .filter((category) => category.id !== "all")
        .map((category) => (
          <li
            className={
              projectCategoriesCopy.includes(category.label)
                ? `${css.categoryListI} ${css.selected}`
                : css.categoryListI
            }
            key={category.id}
            onClick={() => updateCategory(category.label)}
          >
            {category.label.toLowerCase()}
          </li>
        ))}
    </ul>
  );
};

export default CategoryList;
