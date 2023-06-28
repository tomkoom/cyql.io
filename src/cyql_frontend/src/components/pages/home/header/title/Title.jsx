import React from "react";
import css from "./Title.module.css";
import iclogo from "../../../../../../assets/ic-logo.svg";

// routes
import { toApps } from "@/routes/routes";

// state
import { useSelector } from "react-redux";
import { selectProjectsDocs } from "@/state/projects";

const Title = () => {
  const projectsDocs = useSelector(selectProjectsDocs).filter(
    (projectDoc) => projectDoc.data.archived !== true
  );
  const projectsDocsNum = projectsDocs.length;

  return (
    <h2 className={css.title}>
      curated list of{" "}
      {projectsDocsNum > 0 ? (
        <span className={css.projectsDocsNum} onClick={toApps}>
          {projectsDocsNum}
        </span>
      ) : (
        <span className={css.dots}>...</span>
      )}{" "}
      <span className={css.badge}>
        <img className={css.iclogo} src={iclogo} alt="Internet Computer iclogo" />
        <span>#InternetComputer</span>
      </span>{" "}
      projects
    </h2>
  );
};

export default Title;
