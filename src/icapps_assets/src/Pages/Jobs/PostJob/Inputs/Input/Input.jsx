import React from "react";
import css from "./Input.module.css";

const Input = ({ id, type, label, placeholder, note, required }) => {
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
      />
      {note && <p className={css.note}>{note}</p>}
    </div>
  );
};

export default Input;
