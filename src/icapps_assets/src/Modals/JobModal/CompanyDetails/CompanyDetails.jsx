import React from "react";
import css from "./CompanyDetails.module.css";

// state
import { useSelector } from "react-redux";
import { selectActiveJob } from "../../../State/jobs/job";

const CompanyDetails = () => {
  const j = useSelector(selectActiveJob);

  return (
    <div className={css.companyDetails}>
      <h4 className={css.title}>Company Details</h4>
      <ul>
        {j.companyName && (
          <li>
            <p>{j.companyName}</p>
          </li>
        )}
        {j.companyWebsite && (
          <li>
            <a href={j.companyWebsite} target="_blank" rel="noreferrer noopener">
              Website
            </a>
          </li>
        )}
        {j.companyTwitter && (
          <li>
            <a href={j.companyTwitter} target="_blank" rel="noreferrer noopener">
              Twitter
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default CompanyDetails;
