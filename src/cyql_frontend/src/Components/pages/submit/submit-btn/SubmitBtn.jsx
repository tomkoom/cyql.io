import React from "react";
import css from "./SubmitBtn.module.css";

const SubmitBtn = ({ submissionLoader }) => {
  return (
    <button
      className={
        submissionLoader === true
          ? `${css.submitBtn} ${css.disabled} primaryBtn`
          : `${css.submitBtn} primaryBtn`
      }
      type="submit"
      disabled={submissionLoader === true ? true : false}
    >
      {submissionLoader === true ? "submitting..." : "submit"}
    </button>
  );
};

export default SubmitBtn;
