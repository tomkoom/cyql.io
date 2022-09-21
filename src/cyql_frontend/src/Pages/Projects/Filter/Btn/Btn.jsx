import React from "react";
import css from "./Btn.module.css";

// icons
import { iAngleDown } from "../../../../Icons/Icons";

const Btn = ({ label, filter }) => {
  return (
    <div className={css.btn}>
      <p className={css.text}>
        {label}{" "}
        <span className={css.category}>
          {filter === "all"
            ? "All"
            : filter === "true"
            ? "True"
            : filter === "false"
            ? "False"
            : null}
        </span>{" "}
        <span className={css.icon}>{iAngleDown}</span>
      </p>
    </div>
  );
};

export default Btn;
