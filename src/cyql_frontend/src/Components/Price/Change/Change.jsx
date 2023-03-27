import React from "react";
import css from "./Change.module.css";

const Change = ({ change, icon, color }) => {
  return (
    <div className={css.change}>
      <p style={{ color }} className={css.value}>
        {icon && <span className={css.icon}>{icon}</span>}
        {Number(Math.abs(change)).toFixed(2) + "%"}
      </p>
      <p className={css.interval}>24h</p>
    </div>
  );
};

export default Change;
