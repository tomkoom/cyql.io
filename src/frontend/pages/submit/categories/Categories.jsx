import React from "react";
import css from "./Categories.module.css";

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { selectCategoriesSortedByNum } from "@/state/categories/categoriesSortedByNum";
import { selectSubmit, setSubmit } from "@/state/submit/submit";

const Categories = () => {
  const dispatch = useAppDispatch();
  const categoriesSortedByNum = useAppSelector(selectCategoriesSortedByNum);
  const submit = useAppSelector(selectSubmit);

  const setCategory = (e) => {
    dispatch(
      setSubmit({ ...submit, [e.target.name]: e.target.value })
    );
  };

  return (
    <div className={css.categories}>
      <p className={css.label}>project category</p>
      <ul className={css.list}>
        {categoriesSortedByNum
          .filter((category) => category.id !== "all")
          .map((category) => (
            <li key={category.id}>
              <label htmlFor={category.id}>
                <input
                  id={category.id}
                  className={css.categoryHidden}
                  value={category.id}
                  type="radio"
                  name="category"
                  onChange={setCategory}
                />
                <div className={css.category}>
                  {category.icon !== "" && <span className={css.icon}>{category.icon}</span>}{" "}
                  {category.label.toLowerCase()}
                </div>
              </label>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Categories;
