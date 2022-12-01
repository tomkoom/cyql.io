import React from "react";
import css from "./NotActive.module.css";

// icons
import { iCaretUp } from "@icons/Icons";

const NotActive = ({ num, click }) => {
  return (
    <button className={css.btn} onClick={click}>
      <span className={css.icon}>{iCaretUp}</span>
      <p className={css.num}>{num}</p>
    </button>
  );
};

export default NotActive;
