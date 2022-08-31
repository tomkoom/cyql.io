import React from "react";
import css from "./Input.module.css";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectJob, setJob } from "../../../../../State/jobs/job";

const Input = ({ id, type, label, placeholder, note, required }) => {
  const dispatch = useDispatch();
  const job = useSelector(selectJob);

  const handleChange = (e) => {
    dispatch(setJob({ ...job, [e.target.name]: e.target.value }));
  };

  return (
    <div className={css.input}>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        className="input"
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        onChange={handleChange}
      />
      {note && <p className={css.note}>{note}</p>}
    </div>
  );
};

export default Input;
