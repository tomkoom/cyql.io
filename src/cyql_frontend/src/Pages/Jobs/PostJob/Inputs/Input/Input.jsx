import React from "react";
import css from "./Input.module.css";

// state
import { useDispatch } from "react-redux";
import { setJob } from "../../../../../State/jobs/job";

const Input = ({ id, type, label, placeholder, note, required }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setJob({ [e.target.name]: e.target.value }));
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
