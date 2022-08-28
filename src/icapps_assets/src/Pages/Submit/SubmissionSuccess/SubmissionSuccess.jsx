import React from "react";
import css from "./SubmissionSuccess.module.css";

// routes
import { toHome } from "../../../Routes/routes";

const SubmissionSuccess = () => {
  return (
    <div className={css.submissionSuccess}>
      <div className={css.content}>
        <p>
          Your project has been successfully submitted and will appear on the site after a quick
          review! Go to{" "}
          <span className={css.link} onClick={toHome}>
            Homepage 🏠
          </span>
        </p>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
