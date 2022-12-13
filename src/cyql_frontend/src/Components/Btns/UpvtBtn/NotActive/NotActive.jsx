import React from "react";
import css from "./NotActive.module.css";

// icons
import { iCaretUp } from "@icons/Icons";

const NotActive = ({ num, click, location }) => {
  return (
    <button
      style={location === "home" ? { width: "2.5rem" } : { width: "2.75rem" }}
      className={css.btn}
      onClick={click}
    >
      <span
        className={location === "home" ? `${css.icon} ${css.size5}` : `${css.icon} ${css.size4}`}
      >
        {iCaretUp}
      </span>
      <p className={css.num}>{num}</p>
    </button>
  );
};

export default NotActive;
