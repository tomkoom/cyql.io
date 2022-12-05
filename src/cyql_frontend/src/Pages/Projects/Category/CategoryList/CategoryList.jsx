import React, { useEffect, useRef } from "react";
import css from "./CategoryList.module.css";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectCategories } from "@state/modals/categories";
import { setCategory, selectCategory } from "@state/projects/category";
import { selectProjects } from "@state/projects";

const CategoryList = ({ openCategoryList, setOpenCategoryList, categoryBtnRef }) => {
  const dispatch = useDispatch();
  const categoryListRef = useRef(null);
  const categories = useSelector(selectCategories);
  const category = useSelector(selectCategory);
  const p = useSelector(selectProjects);
  const pNum = p.length;

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

  const sort = (a, b) => {
    const aLen = a.label === "All" ? pNum : p.filter((p) => p.category === a.label).length;
    const bLen = b.label === "All" ? pNum : p.filter((p) => p.category === b.label).length;
    return bLen - aLen;
  };

  const num = (c) => {
    return c.label === "All" ? pNum : p.filter((p) => p.category === c.label).length;
  };

  return (
    <ul className={css.li} ref={categoryListRef}>
      {[...categories]
        .sort((a, b) => sort(a, b))
        .map((c) => (
          <li
            className={css.liI}
            id={category === c.label ? css.active : undefined}
            key={c.id}
            onClick={() => clickCategory(c.label)}
          >
            {c.icon} {c.label} {num(c)}
          </li>
        ))}
    </ul>
  );
};

export default CategoryList;
