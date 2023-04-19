import React, { useEffect, useRef } from "react";
import css from "./CategoryList.module.css";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectCategories as selectAllCategories } from "@state/categories";
import { setCategory, selectCategory } from "@state/projects/category";
import { selectProjectsDocs, selectProjectsNum } from "@state/projects";

const CategoryList = ({ openCategoryList, setOpenCategoryList, categoryBtnRef }) => {
  const dispatch = useDispatch();
  const categoryListRef = useRef(null);
  const allCategories = useSelector(selectAllCategories);
  const projectCategory = useSelector(selectCategory);
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
    const filter = (projectsDoc, label) => projectsDoc.data.categories.includes(label);
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

  const categoriesNum = (category) => {
    return category.label === "All"
      ? projectsNum
      : projectsDocs.filter((projectsDoc) => projectsDoc.data.categories.includes(category.label))
          .length;
  };

  return (
    <ul className={css.categoryList} ref={categoryListRef}>
      {[...allCategories]
        .sort((a, b) => sort(a, b))
        .map((category) => (
          <li
            className={css.categoryListI}
            id={projectCategory === category.label ? css.active : undefined}
            key={category.id}
            onClick={() => clickCategory(category.label)}
          >
            {category.icon} {category.label.toLowerCase()}{" "}
            <span className={css.categoriesNum}>{categoriesNum(category)}</span>
          </li>
        ))}
    </ul>
  );
};

export default CategoryList;
