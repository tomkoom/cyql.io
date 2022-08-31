import React from "react";
import css from "./SubmitBtn.module.css";

const SubmitBtn = () => {
  return (
    <div className={css.submitBtn} type="submit">
      {/* user authentication verification */}
      {submissionLoader ? "Submitting..." : "Submit"}
    </div>
  );
};

export default SubmitBtn;
