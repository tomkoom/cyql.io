import React from "react";
import css from "./Links.module.css";

// icons
import { iLink, iTwitter } from "../../../../Icons/Icons";

const Links = ({ companyWebsite, companyTwitter }) => {
  return companyWebsite || companyTwitter ? (
    <ul className={css.links}>
      {companyWebsite && (
        <li>
          <span className={css.icon}>{iLink}</span>
        </li>
      )}
      {companyTwitter && (
        <li>
          <span className={css.icon}>{iTwitter}</span>
        </li>
      )}
    </ul>
  ) : (
    ""
  );
};

export default Links;
