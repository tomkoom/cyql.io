import React from "react";
import css from "./Categories.module.css";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectCategories } from "@state/modals/categories";
import { selectProjectCategory, setProjectCategory } from "@state/modals/projectModal";

const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const pCat = useSelector(selectProjectCategory);
  const pCatCopy = [...pCat];

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
    <ul className={css.categories}>
      {categories
        .filter((c) => c.id !== "all")
        .map((c) => (
          <li
            className={pCat.includes(c.label) ? `${css.category} ${css.selected}` : css.category}
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

export default Category;
