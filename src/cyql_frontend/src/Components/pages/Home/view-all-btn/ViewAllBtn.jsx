import React from "react";
import css from "./ViewAllBtn.module.css";

const ViewAllBtn = ({ nav }) => {
  return (
    <button className={css.btn} onClick={nav}>
      view all
    </button>
  );
};

export default ViewAllBtn;
