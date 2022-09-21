import React from "react";
import css from "./ViewMoreBtn.module.css";

// icons
import { iAngleRight } from "../../../Icons/Icons";

const ViewMoreBtn = ({ nav, children }) => {
  return (
    <button className={css.btn} onClick={nav}>
      <p>{children}</p>
      <span className={css.icon}>{iAngleRight}</span>
    </button>
  );
};

export default ViewMoreBtn;
