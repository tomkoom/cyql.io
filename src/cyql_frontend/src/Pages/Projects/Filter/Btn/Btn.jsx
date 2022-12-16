import React from "react";
import css from "./Btn.module.css";

// icons
import { iAngleDown } from "@icons/Icons";

const Btn = ({ label, filter }) => {
  return (
    <button className={css.btn}>
      <p>{label}</p>
      <p className={css.category}>{filter === null ? "all" : filter ? "true" : "false"}</p>
      <span className={css.icon}>{iAngleDown}</span>
    </button>
  );
};

export default Btn;
