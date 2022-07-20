import React from "react";
import css from "./CrossIcon.module.css";

const CrossIcon = ({ onClick }) => {
  return (
    <div className={css.cross} onClick={onClick}>
      <div className={css.crossIcon}></div>
    </div>
  );
};

export default CrossIcon;
