import React from "react";
import css from "./AboutPosition.module.css";

const AboutPosition = ({ description, compensation, equity }) => {
  return (
    <div className={css.aboutPosition}>
      <div className={css.description}>
        <h4 className={css.descriptionTitle}>About position</h4>
        <p className={css.text}>{description}</p>
      </div>

      <ul className={css.perks}>
        <li>
          <h5 className={css.subtitle}>Compensation</h5>
          <p className={css.perksText}>{compensation ? compensation : "n/a"}</p>
        </li>
        <li>
          <h5 className={css.subtitle}>Equity</h5>
          <p className={css.perksText}>{equity ? equity : "n/a"}</p>
        </li>
      </ul>
    </div>
  );
};

export default AboutPosition;
