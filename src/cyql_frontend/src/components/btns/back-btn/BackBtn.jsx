import React from "react";
import css from "./BackBtn.module.css";

// routes
import { goBack } from "@routes/routes";

// icons
import { iArrowLeft } from "@icons/Icons";

const BackBtn = () => {
  return (
    <button className={css.backBtn} onClick={() => goBack()}>
      {iArrowLeft}
    </button>
  );
};

export default BackBtn;
