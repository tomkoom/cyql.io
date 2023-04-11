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
  const pCatCopy = [...projectCategory];

  const add = (c) => {
    if (pCatCopy.includes(c)) {
      const index = pCatCopy.indexOf(c);
      pCatCopy.splice(index, 1);
    } else {
      pCatCopy.push(c);
    }
    dispatch(setProjectCategory(pCatCopy));
  };

  return (
    <ul className={css.categoryList}>
      {categories
        .filter((c) => c.id !== "all")
        .map((c) => (
          <li
            className={
              projectCategory.includes(c.label) ? `${css.categoryListI} ${css.selected}` : css.categoryListI
            }
            key={c.id}
            onClick={() => {
              add(c.label);
            }}
          >
            <p>{c.label}</p>
          </li>
        ))}
    </ul>
  );
};

export default CategoryList;
