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
  const categories = useSelector(selectCategories);
  const category = useSelector(selectCategory);
  const projects = useSelector(selectProjectsDocs);
  const projectsNum = useSelector(selectProjectsNum);

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
    const filter = (project, label) => project.category.includes(label);
    const aLen =
      a.label === "All"
        ? projectsNum
        : projects.filter((project) => filter(project, a.label)).length;
    const bLen =
      b.label === "All"
        ? projectsNum
        : projects.filter((project) => filter(project, b.label)).length;
    return bLen - aLen;
  };

  const num = (c) => {
    return c.label === "All"
      ? projectsNum
      : projects.filter((project) => project.data.category.includes(c.label)).length;
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
