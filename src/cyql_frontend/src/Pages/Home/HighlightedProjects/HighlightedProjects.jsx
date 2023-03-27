import React from "react";
import css from "./HighlightedProjects.module.css";

// routes
import { toApps } from "@routes/routes";

// components
import { Loader, ViewMoreBtn } from "@components/index";
import { Project } from "./index";

// state
import { useSelector } from "react-redux";
import { selectProjectsLength } from "@state/projects";

const HighlightedProjects = ({ projects }) => {
  const pNum = useSelector(selectProjectsLength);

  return (
    <div className={css.projects}>
      {!projects.length ? (
        <Loader />
      ) : (
        <div className={css.grid}>
          {projects.slice(0, 24).map((p) => (
            <Project
              slug={p.slug}
              id={p.id}
              name={p.name}
              logo={p.logo}
              category={p.category}
              canister={p.canister}
              github={p.github}
              description={p.description}
              upvotedBy={p.upvotedBy}
              key={p.id}
            />
          ))}
        </div>
      )}

      <div className={css.viewMoreBtn}>
        {projects.length > 0 && <ViewMoreBtn nav={toApps}>view all {pNum} projects</ViewMoreBtn>}
      </div>
    </div>
  );
};

export default HighlightedProjects;
