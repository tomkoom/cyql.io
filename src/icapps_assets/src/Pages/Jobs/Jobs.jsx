import React, { useEffect } from "react";
import css from "./Jobs.module.css";

// routes
import { toPostJob } from "../../Routes/routes";

// firestore
import { getDocs } from "firebase/firestore";
import { jobsCollRef } from "../../Firestore/firestore-collections";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectJobs, setJobs } from "../../State/jobs/jobs";

const Jobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector(selectJobs);

  const getJobs = async () => {
    const querySnapshot = await getDocs(jobsCollRef);
    let jobs = [];
    querySnapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() });
    });
    dispatch(setJobs(jobs));
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
