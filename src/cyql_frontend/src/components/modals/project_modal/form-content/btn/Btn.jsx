import React from "react";
import css from "./Btn.module.css";

const Btn = ({ property, value, label, setProperty }) => {
  return (
    <button
      className={property === value ? `${css.btn} ${css.active}` : css.btn}
      onClick={() => setProperty(value)}
    >
      {label}
    </button>
  );
};

export default Btn;
