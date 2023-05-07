import React from "react";
import css from "./Categories.module.css";

// components
import { Title, CategoryList } from "./index";

const Categories = () => {
  return (
    <div className={css.categories}>
      <Title />
      <CategoryList />
    </div>
  );
};

export default Categories;
