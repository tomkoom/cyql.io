import React from "react";
import css from "./JobList.module.css";

// utils
import { substring } from "../../../Utils/substirng";

// state
import { useSelector } from "react-redux";
import { selectJobs } from "../../../State/jobs/jobs";

const JobList = () => {
  const jobs = useSelector(selectJobs);
  const jobsCopy = [...jobs];

  const sort = (a, b) => {
    return a.id - b.id;
  };

  const handleClick = () => {
    console.log("123");
  };

  return (
    <div className={css.jobList}>
      {jobsCopy
        .sort((a, b) => sort(a, b))
        .map((job, i) => (
          <div className={css.row} key={i} onClick={handleClick}>
            <div className={css.coll}>
              <h3 className={css.title}>{job.title}</h3>
              <p>{job.category}</p>
              <p>{job.company_name}</p>
            </div>
            <div className={css.coll}>
              {job.company_website || job.company_twitter ? (
                <ul className={css.socials}>
                  {job.company_website && <li>{job.company_website}</li>}
                  {job.company_twitter && <li>{job.company_twitter}</li>}
                </ul>
              ) : (
                ""
              )}
            </div>
            <div className={css.coll}>{job.description && <p>{substring(job.description)}</p>}</div>
            <div>{job.submitted.toString()}</div>
          </div>
        ))}
    </div>
  );
};

export default JobList;
