import React from "react";
import css from "./TextArea.module.css";

const TextArea = ({ id, label, value, onChange }) => {
  return (
    <div className={css.textarea}>
      <label className={css.label} htmlFor={id}>
        {label}
      </label>
      <textarea value={value} onChange={onChange} id={id} name={id} rows="6" />
    </div>
  );
};

export default TextArea;
