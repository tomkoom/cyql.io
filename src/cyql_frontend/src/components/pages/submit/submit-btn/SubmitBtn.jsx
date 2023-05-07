import React from "react";
import css from "./SubmitBtn.module.css";

const SubmitBtn = ({ submitIsLoading }) => {
  return (
    <button
      className={
        submitIsLoading === true
          ? `${css.submitBtn} ${css.disabled} primaryBtn`
          : `${css.submitBtn} primaryBtn`
      }
      type="submit"
      disabled={submitIsLoading === true ? true : false}
    >
      {submitIsLoading === true ? "submitting..." : "submit"}
    </button>
  );
};

export default SubmitBtn;
