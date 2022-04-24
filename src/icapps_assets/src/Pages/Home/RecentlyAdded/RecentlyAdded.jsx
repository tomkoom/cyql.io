import React from "react";
import css from "./RecentlyAdded.module.css";

// routes
import { toApp, toApps } from "../../../Routes/routes";

// components
import { Loader, ViewMoreBtn } from "../../../Components/index";

// icons
import { iGithub, iDatabase } from "../../../Icons/Icons";

// redux
import { useSelector } from "react-redux";
import { selectProjects } from "../../../State/projects";

const RecentlyAdded = ({ projects }) => {
  const projectsNum = useSelector(selectProjects).length;

  return (
    <div>
      <div className={css.projectsList}>
        {!projects.length ? (
          <Loader />
        ) : (
          projects
            .slice(0, 10)
            .sort((project) => (project.promoted ? -1 : 0))
            .sort((project) => (project.dateAdded ? -1 : 0))
            .map((project) => (
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
                </div>
              </div>
            ))
        )}
      </div>
      {projects.length > 0 && (
        <ViewMoreBtn nav={toApps}>View all {projectsNum} projects &gt;</ViewMoreBtn>
      )}
    </div>
  );
};

export default RecentlyAdded;
