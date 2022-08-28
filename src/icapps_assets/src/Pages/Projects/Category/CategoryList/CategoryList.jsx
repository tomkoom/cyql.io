import React, { useEffect, useRef } from "react";
import css from "./CategoryList.module.css";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectCategories } from "../../../../State/categories";
import { setCategory, selectCategory } from "../../../../State/category";

const CategoryList = ({ openCategoryList, setOpenCategoryList, categoryBtnRef }) => {
  const dispatch = useDispatch();
  const categoryListRef = useRef(null);
  const categories = useSelector(selectCategories);
  const category = useSelector(selectCategory);

  const handleOutsideClick = (e) => {
    if (
      openCategoryList &&
      categoryListRef.current &&
      !categoryListRef.current.contains(e.target) &&
      categoryBtnRef.current &&
      !categoryBtnRef.current.contains(e.target)
    ) {
      dispatch(setOpenCategoryList(false));
    }
  };

  useEffect(() => {
    // bind the event listener
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      // unbind the event listener on clean up
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openCategoryList]);

  const clickCategory = (categoryName) => {
    dispatch(setCategory(categoryName));
    setOpenCategoryList(false);
  };

  return (
    <div className={css.categoryList} ref={categoryListRef}>
      <ul>
        {categories.map((c) => (
          <li
            id={category === c.label ? css.active : undefined}
            key={c.id}
            onClick={() => clickCategory(c.label)}
          >
            {c.icon} {c.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
