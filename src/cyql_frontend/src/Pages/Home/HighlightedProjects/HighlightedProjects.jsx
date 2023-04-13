import React from "react";
import css from "./HighlightedProjects.module.css";

// routes
import { toApps } from "@routes/routes";

// components
import { Loader, ViewMoreBtn } from "@components/index";
import { Project } from "./index";

const HighlightedProjects = ({ projects }) => {
  return (
    <div className={css.projects}>
      {!projects.length ? (
        <Loader />
      ) : (
        <div className={css.grid}>
          {projects.slice(0, 24).map((p) => (
            <Project
              id={p.key}
              key={p.key}
              // ...
              slug={p.data.slug}
              name={p.data.name}
              logo={p.data.logo}
              category={p.data.category}
              canister={p.data.canister}
              github={p.data.github}
              description={p.data.description}
              upvotedBy={p.data.upvotedBy}
            />
          ))}
        </div>
      )}

      <div className={css.viewMoreBtn}>
        {projects.length > 0 && (
          <ViewMoreBtn nav={toApps}>view all {projects.length} projects</ViewMoreBtn>
        )}
      </div>
    </div>
  );
};

export default HighlightedProjects;
