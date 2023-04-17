import React from "react";
import css from "./Summary.module.css";

// redux
import { useSelector } from "react-redux";
import { selectProjectsNum } from "@state/projects";

const Summary = () => {
  const projectsNum = useSelector(selectProjectsNum);

  return (
    <div className={css.summary}>
      <ul>
        <li>
          projects:&nbsp;<span className={css.highlight}>{projectsNum}</span>
        </li>
      </ul>
    </div>
  );
};

export default Summary;
