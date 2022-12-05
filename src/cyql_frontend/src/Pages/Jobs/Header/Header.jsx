import React from "react";
import css from "./Header.module.css";

// routes
import { toPostJob } from "@routes/routes";

const Header = () => {
  return (
    <div className={css.header}>
      <h2 className="pageTitle">Jobs</h2>
      <button className="primaryBtn" onClick={toPostJob}>
        Post a job
      </button>
    </div>
  );
};

export default Header;
