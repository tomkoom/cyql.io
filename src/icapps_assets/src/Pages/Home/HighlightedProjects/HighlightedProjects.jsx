import React from "react";
import css from "./HighlightedProjects.module.css";

// routes
import { toApp, toApps } from "../../../Routes/routes";

// components
import { Loader, UpvoteBtn2, ViewMoreBtn } from "../../../Components/index";

// icons
import { iGithub, iDatabase } from "../../../Icons/Icons";

// redux
import { useSelector } from "react-redux";
import { selectProjectsLength } from "../../../State/projects";

const HighlightedProjects = ({ projects }) => {
  const projectsLength = useSelector(selectProjectsLength);

  return (
    <div>
      <div className={css.projectsList}>
        {!projects.length ? (
          <Loader />
        ) : (
          projects.slice(0, 10).map((project) => (
            <div
              className={`${css.projectsList__i} ${project.promoted ? css.promoted : null}`}
              onClick={() => toApp(project.id)}
              key={project.id}
            >
              <div className={css.projectsList__i__wrapper}>
                {/* logo */}
                {project.logo && (
                  <img className={css.logo} src={project.logo} alt={`${project.name} logo`} />
                )}

                {/* name, category & tags */}
                <div className={css.titletags}>
                  <h3>{project.name}</h3>

                  {project.category && project.category !== "NFTs" && (
                    <ul>
                      {project.category && <li>{project.category}</li>}
                      {project.canister && <li>{iDatabase}&nbsp;&nbsp;Hosted on IC</li>}
                      {project.github && <li>{iGithub}&nbsp;&nbsp;Open Source</li>}
                    </ul>
                  )}

                  <p className={css.projectDescription}>
                    {project.description && project.description.length > 50
                      ? `${project.description.substring(0, 50)}…`
                      : project.description}
                  </p>
                </div>

                <div className={css.right} onClick={(e) => e.stopPropagation()}>
                  <UpvoteBtn2 idx={project.idx} upvotedBy={project.upvotedBy} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {projects.length > 0 && (
        <ViewMoreBtn nav={toApps}>View all {projectsLength} projects &gt;</ViewMoreBtn>
      )}
    </div>
  );
};

export default HighlightedProjects;
