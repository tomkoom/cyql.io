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
      <div className={css.projectsLi}>
        {!projects.length ? (
          <Loader />
        ) : (
          projects.slice(0, 10).map((project) => (
            <div className={css.projectsLiI} onClick={() => toApp(project.id)} key={project.id}>
              <div className={css.content}>
                {/* logo */}
                {project.logo && (
                  <img className={css.logo} src={project.logo} alt={`${project.name} logo`} />
                )}

                {/* name, category & tags */}
                <div className={css.titletags}>
                  <h3>{project.name}</h3>

                  <ul>
                    {project.category && <li>{project.category}</li>}
                    {project.canister && <li>{iDatabase}&nbsp;&nbsp;Hosted on IC</li>}
                    {project.github && <li>{iGithub}&nbsp;&nbsp;Open Source</li>}
                  </ul>

                  <p className={css.description}>
                    {project.description && project.description.length > 66
                      ? `${project.description.substring(0, 66)}…`
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
