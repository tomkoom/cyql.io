import React from "react";
import css from "./Input.module.css";

const Input = ({ id, label, type, value, onChange }) => {
  return (
    <div className={css.input}>
      <label className={css.label} htmlFor={id}>
        {label}
      </label>
      <input value={value} onChange={onChange} type={type} id={id} name={id} autoComplete="off" />
    </div>
  );
};

export default Input;
