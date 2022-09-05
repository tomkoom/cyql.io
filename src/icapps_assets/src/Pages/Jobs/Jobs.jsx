import React, { useEffect } from "react";
import css from "./Jobs.module.css";

// backend
import { Actor, HttpAgent } from "@dfinity/agent";
import {
  canisterId as cyqlCanisterId,
  idlFactory as cyqlIdlFactory,
} from "../../../../declarations/icapps/index";

// routes
import { toPostJob } from "../../Routes/routes";

// state
import { useDispatch } from "react-redux";
import { setJobs } from "../../State/jobs/jobs";

// components
import JobList from "./JobList/JobList";

// host
// const host = "https://mainnet.dfinity.network";
const hostLocal = "http://127.0.0.1:8080/";
const cyqlCanisterIdLocal = "rrkah-fqaaa-aaaaa-aaaaq-cai";

// auth
import { useAuth } from "../../Context/AuthContext";

const Jobs = () => {
  const dispatch = useDispatch();

  const getJobs = async () => {
    try {
      const cyql = Actor.createActor(cyqlIdlFactory, {
        agent: new HttpAgent({ hostLocal }),
        canisterId: cyqlCanisterIdLocal,
      });
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
