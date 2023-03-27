import React from "react";
import css from "./Jobs.module.css";

// components
import { Header, JobList /* Tabs */ } from "./index";

const Jobs = () => {
  return (
    <div className={css.jobs}>
      <Header />
      {/* <Tabs /> */}
      <JobList />
    </div>
  );
};

export default Jobs;
