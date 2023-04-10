import React from "react";
import css from "./Summary.module.css";

// redux
import { useSelector } from "react-redux";
import { selectJunoProjects } from "@state/junoProjects";

const Summary = () => {
  const projectsNum = useSelector(selectJunoProjects).length;

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
