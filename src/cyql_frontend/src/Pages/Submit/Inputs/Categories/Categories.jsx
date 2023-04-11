import React from "react";
import css from "./Categories.module.css";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectCategories } from "../../../../state/modals/categories";
import {
  selectProjectSubmissionData,
  setProjectSubmissionData,
} from "../../../../state/projectSubmission";

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const projectSubmissionData = useSelector(selectProjectSubmissionData);

  const handleInput = (e) => {
    dispatch(
      setProjectSubmissionData({ ...projectSubmissionData, [e.target.name]: e.target.value })
    );
  };

  return (
    <div className={css.categories}>
      <p className={css.label}>Project category</p>
      <ul>
        {categories.map((c) =>
          c.id !== "all" ? (
            <li key={c.id}>
              <label htmlFor={c.id}>
                <input
                  id={c.id}
                  className={css.categoryHidden}
                  value={c.id}
                  type="radio"
                  name="category"
                  onChange={handleInput}
                />
                <div className={css.category}>
                  {c.icon}&nbsp;&nbsp;{c.label}
                </div>
              </label>
            </li>
          ) : (
            ""
          )
        )}
      </ul>
    </div>
  );
};

export default Categories;
