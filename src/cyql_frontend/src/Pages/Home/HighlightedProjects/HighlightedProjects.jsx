import React from "react";
import css from "./HighlightedProjects.module.css";

// routes
import { toApp, toApps } from "@routes/routes";

// components
import { Loader, UpvtBtn, ViewMoreBtn } from "@components/index";
import { Logo, Main } from "./index";

// state
import { useSelector } from "react-redux";
import { selectProjectsLength } from "@state/projects";

const HighlightedProjects = ({ projects }) => {
  const pNum = useSelector(selectProjectsLength);

  const openProject = (slug) => {
    toApp(slug);
  };

  return (
    <div className={css.projects}>
      <div className={css.grid}>
        {!projects.length ? (
          <Loader />
        ) : (
          projects.slice(0, 16).map((p) => (
            <div className={css.p} onClick={() => openProject(p.slug)} key={p.id}>
              <Logo name={p.name} logo={p.logo} />
              <Main
                name={p.name}
                category={p.category}
                canister={p.canister}
                github={p.github}
                description={p.description}
              />

              <div className={css.upvote} onClick={(e) => e.stopPropagation()}>
                <UpvtBtn id={p.id} upvotedBy={p.upvotedBy} />
              </div>
            </div>
          ))
        )}
      </div>

      <div className={css.viewMoreBtn}>
        {projects.length > 0 && <ViewMoreBtn nav={toApps}>View all {pNum} projects</ViewMoreBtn>}
      </div>
    </div>
  );
};

export default HighlightedProjects;
