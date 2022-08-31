import React from "react";
import css from "./Select.module.css";

const Select = ({ id, label, options, required }) => {
  return (
    <div className={css.select}>
      <label htmlFor={id}>{label}</label>
      <select id={id} name={id} required={required}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
