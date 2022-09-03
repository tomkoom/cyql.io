import React from "react";
import css from "./HighlightedProjects.module.css";

// icons
import { iGithub, iDatabase } from "../../../Icons/Icons";

// routes
import { toApp, toApps } from "../../../Routes/routes";

// components
import { Loader, UpvtBtn, ViewMoreBtn } from "../../../Components/index";

// state
import { useSelector } from "react-redux";
import { selectProjectsLength } from "../../../State/projects";

const HighlightedProjects = ({ projects, hideCategory }) => {
  const projectsLength = useSelector(selectProjectsLength);

  return (
    <div>
      <div className={css.projects}>
        {!projects.length ? (
          <Loader />
        ) : (
          projects.slice(0, 16).map((project) => (
            <div className={css.projectsI} onClick={() => toApp(project.id)} key={project.id}>
              <div className={css.content}>
                {/* logo */}
                {project.logo && (
                  <img className={css.logo} src={project.logo} alt={`${project.name}-logo`} />
                )}

                {/* name & tags */}
                <div className={css.main}>
                  <h3 className={css.title}>{project.name}</h3>
                  {(project.canister || project.github) && hideCategory === false ? (
                    <ul className={css.tags}>
                      {hideCategory === true ? "" : <li>{String(project.category)}</li>}
                      {project.canister && <li>{iDatabase}&nbsp;&nbsp;On-Chain</li>}
                      {project.github && <li>{iGithub}&nbsp;&nbsp;Open Source</li>}
                    </ul>
                  ) : (
                    ""
                  )}

                  <p className={css.description}>
                    {project.description && project.description.length > 60
                      ? `${project.description.substring(0, 60)}…`
                      : project.description}
                  </p>
                </div>

                <div className={css.upvote} onClick={(e) => e.stopPropagation()}>
                  <UpvtBtn idx={project.idx} upvotedBy={project.upvotedBy} />
                </div>
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
