import React from "react";
import css from "./Title.module.css";
import logo from "@assets/ic-logo.svg";

// routes
import { toApps } from "@routes/routes";

// state
import { useSelector } from "react-redux";
import { selectProjectsNum } from "@state/projects";

const Title = () => {
  const projectsNum = useSelector(selectProjectsNum);

  return (
    <h2 className={css.title}>
      curated list of{" "}
      {projectsNum && projectsNum > 0 ? (
        <span className={css.projectsNum} onClick={toApps}>
          {projectsNum}
        </span>
      ) : (
        <span className={css.dots}>...</span>
      )}{" "}
      <span className={css.badge}>
        <img className={css.logo} src={logo} alt="Internet Computer logo" />
        <span>#InternetComputer</span>
      </span>{" "}
      projects
    </h2>
  );
};

export default Title;
