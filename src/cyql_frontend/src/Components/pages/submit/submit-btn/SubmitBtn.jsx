import React from "react";
import css from "./SubmitBtn.module.css";

const SubmitBtn = ({ submissionLoader }) => {
  return (
    <button className={`${css.submitBtn} primaryBtn`} type="submit">
      {submissionLoader === true ? "submitting..." : "submit"}
    </button>
  );
};

export default SubmitBtn;
