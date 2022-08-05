import React, { useState } from "react";
import css from "./Category.module.css";

// components
import Btn from "./Btn/Btn";
import CategoryList from "./CategoryList/CategoryList";

const Category = () => {
  const [openCategories, setOpenCategories] = useState(false);
  return (
    <div className={css.category}>
      <div onClick={() => setOpenCategories((prev) => !prev)}>
        <Btn />
      </div>
      <div className={css.categoryList}>{openCategories && <CategoryList />}</div>
    </div>
  );
};

export default Category;
