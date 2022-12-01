import React from "react";
import css from "./Active.module.css";

// icons
import { iCaretUp } from "@icons/Icons";

const Active = ({ num, click }) => {
  return (
    <button className={css.btn} onClick={click}>
      <span className={css.icon}>{iCaretUp}</span>
      <p className={css.num}>{num}</p>
    </button>
  );
};

export default Active;
