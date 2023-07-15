import React from "react";
import css from "./CategoryListModal.module.css";

// icons
import { CrossIcon } from "@/components/icons/index";

// state
import { useSelector, useDispatch } from "react-redux";
import { setCategory, selectCategory } from "@/state/projects/category";
import { selectProjects } from "@/state/projects";
import { selectCategoriesSortedByNum } from "@/state/categories/categoriesSortedByNum";

const CategoryListModal = ({ openCategoryList, setOpenCategoryList }) => {
  const dispatch = useDispatch();
  const projectCategory = useSelector(selectCategory);
  const projectsDocs = useSelector(selectProjects).filter(
    (projectDoc) => projectDoc.data.archived !== true
  );
  const projectsDocsNum = projectsDocs.length;
  const categoriesSortedByNum = useSelector(selectCategoriesSortedByNum);

  const clickCategory = (categoryLabel) => {
    dispatch(setCategory(categoryLabel));
    closeCategoryList();
  };

  const closeCategoryList = () => {
    setOpenCategoryList(false);
  };

  const categoriesNum = (category) => {
    return category.id === "all"
      ? projectsDocsNum
      : projectsDocs.filter((projectsDoc) => projectsDoc.data.categories.includes(category.label))
          .length;
  };

  return (
    openCategoryList === true && (
      <div className={css.categoryListModal}>
        <div className={css.content}>
          <CrossIcon onClick={closeCategoryList} />
          <h3 className={css.title}>filter by category</h3>

          <ul className={css.categories}>
            {categoriesSortedByNum.map((category) => (
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
