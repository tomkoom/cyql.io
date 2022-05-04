import React from "react";
import css from "./BackBtn.module.css";
import { goBack } from "../../../Routes/routes";
import { iArrowLeft } from "../../../Icons/Icons";

const BackBtn = () => {
  return (
    <button className={`${css.backBtn} navlink`} onClick={() => goBack()}>
      {iArrowLeft}
    </button>
  );
};

export default BackBtn;
