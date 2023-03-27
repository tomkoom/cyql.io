import React from "react";
import css from "./JobSubmitted.module.css";

const JobSubmitted = () => {
  return (
    <div className={css.jobSubmitted}>
      <p>Job submitted &#40;refresh to see the submission&#41;.</p>
    </div>
  );
};

export default JobSubmitted;
