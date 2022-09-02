import React, { useEffect } from "react";
import css from "./Jobs.module.css";

// routes
import { toPostJob } from "../../Routes/routes";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectJobs, setJobs } from "../../State/jobs/jobs";

// backend
import { icapps as cyql } from "../../../../declarations/icapps/index";

const Jobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector(selectJobs);

  const getJobs = async () => {
    try {
      await cyql.getJobs().then((jobs) => {
        const jobsArr = [];
        jobs.forEach((el) => {
          const key = typeof el[0] === "bigint" ? Number(el[0]) : el[0]; // convert bigint to num
          const value = el[1];
          jobsArr.push({ [key]: value });
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
        <h2 className="pageTitle">Jobs</h2>
        <button className="primaryBtn" onClick={toPostJob}>
          Post a job
        </button>
      </div>
      <div className={css.content}>
        {jobs.map((job, i) => (
          <div key={i}>{job.title}</div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
