import React from "react";
import css from "./HighlightedProjects.module.css";

// icons
import { iGithub, iDatabase } from "@icons/Icons";

// routes
import { toApp, toApps } from "@routes/routes";

// components
import { Loader, UpvtBtn, ViewMoreBtn } from "@components/index";
import { Logo } from "./index";

// state
import { useSelector } from "react-redux";
import { selectProjectsLength } from "@state/projects";

const HighlightedProjects = ({ projects }) => {
  const projectsLength = useSelector(selectProjectsLength);

  return (
    <div>
      <div className={css.projects}>
        {!projects.length ? (
          <Loader />
        ) : (
          projects.slice(0, 16).map((p) => (
            <div className={css.projectsI} onClick={() => toApp(p.id)} key={p.id}>
              {p.logo && <Logo name={p.name} logo={p.logo} />}

              {/* name & tags */}
              <div className={css.main}>
                <h3 className={css.title}>{p.name}</h3>
                <ul className={css.tags}>
                  {p.category && <li>{String(p.category)}</li>}
                  {p.canister && <li>{iDatabase}&nbsp;&nbsp;On-Chain</li>}
                  {p.github && <li>{iGithub}&nbsp;&nbsp;Open Source</li>}
                </ul>

                <p className={css.description}>
                  {p.description && p.description.length > 60
                    ? `${p.description.substring(0, 60)}…`
                    : p.description}
                </p>
              </div>

              <div className={css.upvote} onClick={(e) => e.stopPropagation()}>
                <UpvtBtn idx={p.idx} upvotedBy={p.upvotedBy} />
              </div>
            </div>
          ))
        )}
      </div>

      <div className={css.viewMoreBtn}>
        {projects.length > 0 && (
          <ViewMoreBtn nav={toApps}>View all {projectsLength} projects</ViewMoreBtn>
        )}
      </div>
    </div>
  );
};

export default HighlightedProjects;
