import React from "react";
import css from "./Summary.module.css";

// redux
import { useSelector } from "react-redux";
import { selectProjectsDocsActiveNum } from "@/state/projects";

const Summary = () => {
  const projectsDocsNum = useSelector(selectProjectsDocsActiveNum);

  return (
    <div className={css.summary}>
      <ul>
        <li>
          all projects:&nbsp;<span className={css.highlight}>{projectsDocsNum}</span>
        </li>
      </ul>
    </div>
  );
};

export default Summary;
