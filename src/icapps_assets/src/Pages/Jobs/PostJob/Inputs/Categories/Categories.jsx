import React from "react";
import css from "./Categories.module.css";

// state
import { useSelector, useDispatch } from "react-redux";
import {
  selectProjectSubmissionData,
  setProjectSubmissionData,
} from "../../../../State/projectSubmission";

const Categories = ({ label, options }) => {
  const dispatch = useDispatch();
  // const projectSubmissionData = useSelector(selectProjectSubmissionData);

  const handleInput = (e) => {
    console.log({ [e.target.name]: e.target.value });
    // dispatch(
    //   setProjectSubmissionData({ ...projectSubmissionData, [e.target.name]: e.target.value })
    // );
  };

  return (
    <div className={css.categories}>
      <p className="label">{label}</p>
      <ul>
        {options.map((option) => (
          <li key={option.id}>
            <label htmlFor={option.id}>
              <input
                id={option.id}
                className={css.categoryHidden}
                value={option.id}
                type="radio"
                name="category"
                onChange={handleInput}
              />
              <div className={css.category}>{option.label}</div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
