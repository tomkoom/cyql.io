import React from "react";
import css from "./JobList.module.css";

// utils
import { substring105 } from "../../../Utils/substring";

// components
import { Links, Logo, Meta, Title } from "./index";

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
              {job.companyLogoUrl && (
                <Logo logo={job.companyLogoUrl} companyName={job.companyName} />
              )}
              <Title title={job.title} category={job.category} companyName={job.companyName} />
            </div>

            <div className={css.description}>
              {job.description && <p>{substring105(job.description)}</p>}
            </div>

            <div className={css.links}>
              <Links companyWebsite={job.companyWebsite} companyTwitter={job.companyTwitter} />
            </div>

            <div className={css.date}>
              <Meta submitted={job.submitted} publisher={job.publisher} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default JobList;
