import React from "react";
import css from "./SubmissionSuccess.module.css";

// hooks
import useNav from "@/hooks/useNav";

const SubmissionSuccess = () => {
  const { toHome } = useNav();

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
