import React from "react";
import css from "./Summary.module.css";

// redux
import { useSelector } from "react-redux";
import { selectProjectsDocs } from "@state/projects";

const Summary = () => {
  const projectsDocs = useSelector(selectProjectsDocs).filter(
    (projectDoc) => projectDoc.data.archived !== true
  );
  const projectsDocsNum = projectsDocs.length;
  const projectsDocsNftsNum = projectsDocs.filter((projectDoc) =>
    projectDoc.data.categories.includes("NFTs")
  ).length;

  return (
    <div className={css.summary}>
      <ul>
        <li>
          all projects:&nbsp;<span className={css.highlight}>{projectsDocsNum}</span>
        </li>
        <li>
          nfts:&nbsp;<span className={css.highlight}>{projectsDocsNftsNum}</span>
        </li>
      </ul>
    </div>
  );
};

export default Summary;
