import React from "react";
import css from "./SubmitBtn.module.css";

// icons
import { iPlus } from "@icons/Icons";

// routes
import { toSubmit } from "@routes/routes";

const SubmitBtn = () => {
  return (
    <button className={css.btn} onClick={toSubmit}>
      <span className={css.icon}>{iPlus}</span>
      <p>Submit your project</p>
    </button>
  );
};

export default SubmitBtn;
