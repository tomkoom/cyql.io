import React from "react";
import css from "./Categories.module.css";

// state
import { useSelector, useDispatch } from "react-redux";
import { setJob, selectJob } from "../../../../../State/jobs/job";

const Categories = ({ label, options }) => {
  const dispatch = useDispatch();
  const job = useSelector(selectJob);

  const handleChange = (e) => {
    dispatch(setJob({ ...job, [e.target.name]: e.target.value }));
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
                onChange={handleChange}
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
