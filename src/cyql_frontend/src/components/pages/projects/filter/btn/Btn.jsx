import React from "react";
import css from "./Btn.module.css";

// icons
import { iAngleDown } from "@icons/Icons";

const Btn = ({ label, filter }) => {
  const style =
    filter === null
      ? null
      : {
          color: "#fff",
          backgroundColor: "var(--highlightColor)",
          padding: "0.25rem 0.5rem",
          borderRadius: "0.5rem",
        };

  return (
    <button className={css.btn}>
      <p>{label}</p>
      <p style={style} className={css.category}>
        {filter === null ? "all" : filter ? "true" : "false"}
      </p>
      <span className={css.icon}>{iAngleDown}</span>
    </button>
  );
};

export default Btn;
