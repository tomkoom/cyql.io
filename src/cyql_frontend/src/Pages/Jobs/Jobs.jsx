import React from "react";
import css from "./Jobs.module.css";

// routes
import { toPostJob } from "../../Routes/routes";

// components
import { JobList, Tabs } from "./index";

const Jobs = () => {
  return (
    <div className={css.jobs}>
      <div className={css.title}>
        <h2 className="pageTitle">Jobs</h2>
        <button className="primaryBtn" onClick={toPostJob}>
          Post a job
        </button>
      </div>
      {/* <Tabs /> */}
      <JobList />
    </div>
  );
};

export default Jobs;
