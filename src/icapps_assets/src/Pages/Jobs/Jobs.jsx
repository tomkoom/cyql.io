import React, { useEffect } from "react";
import css from "./Jobs.module.css";

// backend
import { icapps as cyql } from "../../../../declarations/icapps/index";

// routes
import { toPostJob } from "../../Routes/routes";

// state
import { useDispatch } from "react-redux";
import { setJobs } from "../../State/jobs/jobs";

// components
import JobList from "./JobList/JobList";

const Jobs = () => {
  const dispatch = useDispatch();

  const getJobs = async () => {
    try {
      await cyql.getJobs().then((jobs) => {
        const jobsArr = [];
        jobs.forEach((el) => {
          const id = typeof el[0] === "bigint" ? Number(el[0]) : el[0]; // convert bigint to num
          const job = el[1];
          jobsArr.push({ ...job, id: id });
        });
        dispatch(setJobs(jobsArr));
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className={css.jobs}>
      <div className={css.title}>
        <h2 className="pageTitle">IC Jobs</h2>
        <button className="primaryBtn" onClick={toPostJob}>
          Post a job
        </button>
      </div>
      <JobList />
    </div>
  );
};

export default Jobs;
