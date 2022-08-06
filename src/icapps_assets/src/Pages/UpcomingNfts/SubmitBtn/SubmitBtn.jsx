import React from "react";
import css from "./SubmitBtn.module.css";

// icons
import { iPlus } from "../../../Icons/Icons";

// routes
import { toSubmit } from "../../../Routes/routes";

const SubmitBtn = () => {
  return (
    <button className={css.submitBtn} onClick={toSubmit}>
      <span className={css.icon}>{iPlus}</span>
      <p>Submit your project</p>
    </button>
  );
};

export default SubmitBtn;
