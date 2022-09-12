import React from "react";
import css from "./Website.module.css";

// state
import { useSelector } from "react-redux";
import { selectActiveJob } from "../../../State/jobs/job";

const Website = () => {
  const j = useSelector(selectActiveJob);

  return (
    <div>
      <h4 className={css.title}>Apply by Website</h4>
      <a className="primaryBtn" href={j.applicationUrl} target="_blank" rel="noreferrer noopener">
        Apply
      </a>
    </div>
  );
};

export default Website;
