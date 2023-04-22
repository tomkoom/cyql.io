import React from "react";
import css from "./Name.module.css";

// icons
import { iMeteor } from "@icons/Icons";

const Name = ({ name, grantee }) => {
  return (
    <div className={css.name}>
      <h3 className={css.projectName}>{name}</h3>
      {grantee && (
        <a
          className={css.grantee}
          href="https://dfinity.org/grants"
          target="_blank"
          rel="noreferrer noopener"
        >
          <span className={css.icon}>{iMeteor}</span>
          <p>grantee</p>
        </a>
      )}
    </div>
  );
};

export default Name;
