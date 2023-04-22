import React from "react";
import css from "./Categories.module.css";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectAllCategories } from "@state/allCategories";
import { selectProjectSubmissionData, setProjectSubmissionData } from "@state/projectSubmission";

const Categories = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector(selectAllCategories);
  const projectSubmissionData = useSelector(selectProjectSubmissionData);

  const setCategory = (e) => {
    dispatch(
      setProjectSubmissionData({ ...projectSubmissionData, [e.target.name]: e.target.value })
    );
  };

  return (
    <div className={css.categories}>
      <p className={css.label}>Project category</p>
      <ul>
        {allCategories
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
                  {category.icon}&nbsp;&nbsp;{category.label.toLowerCase()}
                </div>
              </label>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Categories;
