import React from "react";
import css from "./PriceChange.module.css";

const PriceChange = ({ change, icon, color }) => {
  return (
    <div className={css.change}>
      <span style={{ color }} className={css.value}>
        {icon && <span className={css.icon}>{icon}</span>}
        {Number(Math.abs(change)).toFixed(2) + "%"}
      </span>{" "}
      <span className={css.interval}>24h</span>
    </div>
  );
};

export default PriceChange;
