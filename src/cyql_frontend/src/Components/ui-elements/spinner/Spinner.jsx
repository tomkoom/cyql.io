import React from "react";
import css from "./Spinner.module.css";

const Spinner = ({ size = 24 }) => {
  return <div style={{ width: `${size}px`, height: `${size}px` }} className={css.spinner}></div>;
};

export default Spinner;
