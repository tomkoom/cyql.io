import React from "react";
import css from "./Btn.module.css";

// icons
import { iAngleDown } from "@icons/Icons";

const Btn = ({ label, filter }) => {
  return (
    <button className={css.btn}>
      <p>{label}</p>
      <span className={css.category}>
        {filter === "all"
          ? "All"
          : filter === "true"
          ? "True"
          : filter === "false"
          ? "False"
          : null}
      </span>
      <span className={css.icon}>{iAngleDown}</span>
    </button>
  );
};

export default Btn;
