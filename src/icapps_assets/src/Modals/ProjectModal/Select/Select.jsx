import React from "react";
import css from "./Select.module.css";

const Select = ({ id, label, value, onChange, selectOptions }) => {
  return (
    <div className={css.select}>
      <label className={css.label} htmlFor={id}>
        {label}
      </label>
      <select value={value} onChange={onChange} id={id} name={id}>
        {!value && <option value="">Choose {label.toLowerCase()}</option>}
        {selectOptions.map((option) =>
          option.label === "All" ? null : (
            // label - value, not id
            <option value={option.label} key={option.label}>
              {option.label}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default Select;
