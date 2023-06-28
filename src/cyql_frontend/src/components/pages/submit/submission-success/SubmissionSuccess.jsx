import React from "react";
import css from "./SubmissionSuccess.module.css";

// routes
import { toHome } from "@/routes/routes";

const SubmissionSuccess = () => {
  return (
    <div className={css.submissionSuccess}>
      <div className={css.content}>
        <p className={css.text}>
          Thank you for your submission! Your project has been successfully submitted and will
          appear on the site after a quick review! Go to{" "}
          <span className={css.link} onClick={toHome}>
            homepage 🏠
          </span>
        </p>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
