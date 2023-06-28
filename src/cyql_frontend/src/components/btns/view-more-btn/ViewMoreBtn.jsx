import React from "react";
import css from "./ViewMoreBtn.module.css";

// icons
import { iAngleRight } from "@/components/icons/Icons";

const ViewMoreBtn = ({ nav, children }) => {
  return (
    <button className={css.btn} onClick={nav}>
      {children}
      <span className={css.icon}>{iAngleRight}</span>
    </button>
  );
};

export default ViewMoreBtn;
