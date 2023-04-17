import React from "react";
import css from "./Input.module.css";

const Input = ({ label, value, id }) => {
  return (
    <div className={css.field}>
      <label className={css.label} htmlFor={id}>
        {label}
      </label>
      <input value={value} type="text" id={id} disabled />
    </div>
  );
};

export default Input;
