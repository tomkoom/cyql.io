import React, { useEffect } from "react";
import css from "./CategoryListModal.module.css";

// icons
import { CrossIcon } from "@icons/index";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectAllCategories } from "@state/allCategories";
import { setCategory, selectCategory } from "@state/projects/category";
import { selectProjectsDocs, selectProjectsNum } from "@state/projects";

const CategoryListModal = ({ openCategoryList, setOpenCategoryList }) => {
  const dispatch = useDispatch();
  const allCategories = useSelector(selectAllCategories);
  const projectCategory = useSelector(selectCategory);
  const projectsDocs = useSelector(selectProjectsDocs);
  const projectsNum = useSelector(selectProjectsNum);

  const clickCategory = (categoryLabel) => {
    dispatch(setCategory(categoryLabel));
    setOpenCategoryList(false);
  };

  const sortByNum = (a, b) => {
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

  // prevent from scrolling when modal is active
  useEffect(() => {
    if (openCategoryList) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openCategoryList]);

  return (
    openCategoryList && (
      <div className={css.categoryListModal}>
        <div className={css.content}>
          <CrossIcon onClick={() => setOpenCategoryList(false)} />
          <h3 className={css.title}>filter by category</h3>

          <ul className={css.categories}>
            {[...allCategories]
              .sort((a, b) => sortByNum(a, b))
              .map((category) => (
                <li
                  className={css.categoriesI}
                  id={projectCategory === category.label ? css.active : undefined}
                  key={category.id}
                  onClick={() => clickCategory(category.label)}
                >
                  {category.icon} {category.label.toLowerCase()}{" "}
                  <span className={css.categoriesNum}>{categoriesNum(category)}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    )
  );
};

export default CategoryListModal;
