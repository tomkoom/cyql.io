import React from "react";
import css from "./Active.module.css";

// icons
import { iCaretUp } from "@/components/icons/Icons";

const Active = ({ num, click, location }) => {
  return (
    <button
      style={location === "project" ? { width: "2.75rem" } : { width: "2.5rem" }}
      className={css.btn}
      onClick={click}
    >
      <span
        className={location === "project" ? `${css.icon} ${css.size4}` : `${css.icon} ${css.size5}`}
      >
        {iCaretUp}
      </span>
      <p className={css.num}>{num}</p>
    </button>
  );
};

export default Active;
