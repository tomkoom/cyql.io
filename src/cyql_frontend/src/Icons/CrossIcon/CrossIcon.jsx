import React from "react";
import css from "./CrossIcon.module.css";

const CrossIcon = ({ onClick }) => {
  return (
    <div className={css.crossIcon} onClick={onClick ? onClick : null}>
      <div className={css.icon} />
    </div>
  );
};

export default CrossIcon;
