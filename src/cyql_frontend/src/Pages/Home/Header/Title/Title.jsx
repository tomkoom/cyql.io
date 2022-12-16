import React from "react";
import css from "./Title.module.css";
import logo from "../../../../../assets/ic-logo.svg";

// routes
import { toApps } from "@routes/routes";

// state
import { useSelector } from "react-redux";
import { selectProjects } from "@state/projects";

const Title = () => {
  const p = useSelector(selectProjects);
  const pNum = p.length;

  return (
    <h2 className={css.title}>
      The curated list of{" "}
      {pNum && pNum > 0 ? (
        <span className={css.pNum} onClick={toApps}>
          {pNum}
        </span>
      ) : (
        <span className={css.dots}>...</span>
      )}{" "}
      <span className={css.badge}>
        <img className={css.logo} src={logo} alt="Internet Computer logo" />
        <span>Internet Computer</span>
      </span>{" "}
      projects
    </h2>
  );
};

export default Title;
