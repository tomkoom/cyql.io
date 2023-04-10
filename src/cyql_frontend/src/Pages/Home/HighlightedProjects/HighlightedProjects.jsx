import React from "react";
import css from "./HighlightedProjects.module.css";

// routes
import { toApps } from "@routes/routes";

// components
import { Loader, ViewMoreBtn } from "@components/index";
import { Project } from "./index";

// state
import { useSelector } from "react-redux";
import { selectJunoProjects } from "@state/junoProjects";

const HighlightedProjects = ({ projects }) => {
  const projectsNum = useSelector(selectJunoProjects).length;

  return (
    <div className={css.projects}>
      {!projects.length ? (
        <Loader />
      ) : (
        <div className={css.grid}>
          {projects.slice(0, 24).map((p) => (
            <Project
              slug={p.slug}
              id={p.__id__}
              name={p.name}
              logo={p.logo}
              category={p.category}
              canister={p.canister}
              github={p.github}
              description={p.description}
              upvotedBy={p.upvotedBy}
              key={p.__id__}
            />
          ))}
        </div>
      )}

      <div className={css.viewMoreBtn}>
        {projects.length > 0 && <ViewMoreBtn nav={toApps}>view all {projectsNum} projects</ViewMoreBtn>}
      </div>
    </div>
  );
};

export default HighlightedProjects;
