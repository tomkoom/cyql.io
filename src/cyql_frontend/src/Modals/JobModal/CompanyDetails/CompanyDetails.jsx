import React from "react";
import css from "./CompanyDetails.module.css";

// utils
import { formatProtocol } from "../../../Utils/format";

const CompanyDetails = ({ companyName, companyWebsite, companyTwitter, companyLogoUrl }) => {
  return (
    <div className={css.companyDetails}>
      <h4 className={css.title}>Company Details</h4>
      <div className={css.content}>
        {companyLogoUrl && (
          <div className={css.logo}>
            <img src={companyLogoUrl} alt={`${companyName} logo`} />
          </div>
        )}

        <div className={css.main}>
          {companyName && <h5 className={css.name}>{companyName}</h5>}
          {companyWebsite && (
            <a className={css.link} href={companyWebsite} target="_blank" rel="noreferrer noopener">
              {formatProtocol(companyWebsite)}
            </a>
          )}
          {companyTwitter && (
            <a className={css.link} href={companyTwitter} target="_blank" rel="noreferrer noopener">
              {formatProtocol(companyTwitter)}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
