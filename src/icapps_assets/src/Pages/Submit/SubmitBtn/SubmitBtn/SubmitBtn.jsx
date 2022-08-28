import React from "react";
import css from "./SubmitBtn.module.css";

export const SubmitBtn = ({ submissionLoader, isVerified }) => {
  return (
    <button
      className={!isVerified ? `${css.submitBtn} ${css.disabled}` : css.submitBtn}
      disabled={!isVerified}
      type="submit"
    >
      {submissionLoader ? "Submitting..." : "Submit"}
    </button>
  );
};

export default SubmitBtn;
