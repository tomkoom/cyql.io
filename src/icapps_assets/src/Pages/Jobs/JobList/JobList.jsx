import React from "react";
import css from "./JobList.module.css";

// utils
import { substring70 } from "../../../Utils/substirng";

// utils
import { formatDate } from "../../../Utils/format";
import { formatId } from "../../../Utils/formatId";
import { iGlobe, iTwitter } from "../../../Icons/Icons";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectJobs } from "../../../State/jobs/jobs";
import { setActiveJob } from "../../../State/jobs/job";
import { setJobModal } from "../../../State/modals";

const JobList = () => {
  const dispatch = useDispatch();
  const jobs = useSelector(selectJobs);
  const jobsCopy = [...jobs];

  const sort = (a, b) => {
    return b.submitted - a.submitted;
  };

  const openModal = (job) => {
    dispatch(setActiveJob(job));
    dispatch(setJobModal(true));
  };

  return (
    <div className={css.jobList}>
      {jobsCopy
        .sort((a, b) => sort(a, b))
        .map((job, i) => (
          <div className={css.row} key={i} onClick={() => openModal(job)}>
            <div className={css.main}>
              <h3 className={css.title}>{job.title}</h3>
              {job.category && <span className={css.category}>{job.category}</span>}
              {job.companyName && <p>{job.companyName}</p>}
            </div>
            <div className={css.description}>
              {job.description && <p>{substring70(job.description)}</p>}
            </div>
            <div className={css.links}>
              {job.companyWebsite || job.companyTwitter ? (
                <ul>
                  {job.companyWebsite && (
                    <li>
                      <span className={css.icon}>{iGlobe}</span>
                    </li>
                  )}
                  {job.companyTwitter && (
                    <li>
                      <span className={css.icon}>{iTwitter}</span>
                    </li>
                  )}
                </ul>
              ) : (
                ""
              )}
            </div>
            <div className={css.date}>
              <p>Posted {formatDate(job.submitted)}</p>
              <p>
                By{" "}
                {job.publisher === "frr2p-iyhp3-ioffo-ysh2e-babmd-f6gyf-slb4h-whtia-5kg2n-5ix4u-dae"
                  ? "cyql"
                  : formatId(job.publisher)}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default JobList;
