import React, { useEffect, useRef } from "react";
import css from "./CategoryList.module.css";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectCategories } from "@state/modals/categories";
import { setCategory, selectCategory } from "@state/projects/category";
import { selectProjectsDocs, selectProjectsNum } from "@state/projects";

const CategoryList = ({ openCategoryList, setOpenCategoryList, categoryBtnRef }) => {
  const dispatch = useDispatch();
  const categoryListRef = useRef(null);
  const allCategories = useSelector(selectCategories);
  const category = useSelector(selectCategory);
  const projectsDocs = useSelector(selectProjectsDocs);
  const projectsNum = useSelector(selectProjectsNum);

  const handleOutsideClick = (e) => {
    if (
      openCategoryList &&
      categoryListRef.current &&
      !categoryListRef.current.contains(e.target) &&
      categoryBtnRef.current &&
      !categoryBtnRef.current.contains(e.target)
    ) {
      setOpenCategoryList(false);
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

  const clickCategory = (categoryLabel) => {
    dispatch(setCategory(categoryLabel));
    setOpenCategoryList(false);
  };

  const sort = (a, b) => {
    const filter = (projectsDoc, label) => projectsDoc.data.category.includes(label);
    const aLen =
      a.label === "All"
        ? projectsNum
        : projectsDocs.filter((projectDoc) => filter(projectDoc, a.label)).length;
    const bLen =
      b.label === "All"
        ? projectsNum
        : projectsDocs.filter((projectDoc) => filter(projectDoc, b.label)).length;
    return bLen - aLen;
  };

  const categoriesNum = (c) => {
    return c.label === "All"
      ? projectsNum
      : projectsDocs.filter((projectsDoc) => projectsDoc.data.category.includes(c.label)).length;
  };

  return (
    <ul className={css.categoryList} ref={categoryListRef}>
      {[...allCategories]
        .sort((a, b) => sort(a, b))
        .map((c) => (
          <li
            className={css.categoryListI}
            id={category === c.label ? css.active : undefined}
            key={c.id}
            onClick={() => clickCategory(c.label)}
          >
            {c.icon} {c.label.toLowerCase()}{" "}
            <span className={css.categoriesNum}>{categoriesNum(c)}</span>
          </li>
        ))}
    </ul>
  );
};

export default CategoryList;
