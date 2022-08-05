import React from "react";
import css from "./CategoryList.module.css";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectCategories } from "../../../../State/categories";
import { setCategory } from "../../../../State/category";

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  return (
    <div className={css.categoryList}>
      <ul>
        {categories.map((category) => (
          <li key={category.id} onClick={() => dispatch(setCategory(category.name))}>
            {category.icon} {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
