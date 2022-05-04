import React from "react";
import css from "./ViewMoreBtn.module.css";

const ViewMoreBtn = ({ nav, children }) => {
  return (
    <button className={css.viewMoreBtn} onClick={nav}>
      {children}
    </button>
  );
};

export default ViewMoreBtn;
