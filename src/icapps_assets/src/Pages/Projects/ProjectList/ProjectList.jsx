import React from "react";
import css from "./ProjectList.module.css";
import Loader from "../../../Components/Loader/Loader";

//icons
import { iDatabase, iGithub } from "../../../Icons/Icons";

// routes
import { toApp } from "../../../Routes/routes";

// components
import { LoadMoreBtn } from "../../../Components/";
import UpvoteBtn from "./UpvoteBtn/UpvoteBtn";

// state
import { useSelector } from "react-redux";
import { selectProjects } from "../../../State/projects";
import { selectCategory } from "../../../State/category";
import { selectSearch } from "../../../State/search";
import { selectItemsVisible } from "../../../State/loadMore";

const AppList = () => {
  const projects = useSelector(selectProjects);
  const category = useSelector(selectCategory);
  const search = useSelector(selectSearch);
  const itemsVisible = useSelector(selectItemsVisible);

  return (
    <div>
      {projects.length < 1 ? (
        <Loader />
      ) : (
        <ul className={css.li}>
          {projects
            .filter((project) => (category === "All" ? project : project.category === category))
            .filter((project) => {
              if (search === "") {
                return project;
              } else if (
                project.name &&
                project.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return project;
              }
            })
            .slice(0, itemsVisible)
            .map((project) => (
              <li key={project.idx} className={css.liI}>
                <div className={css.card} onClick={() => toApp(project.id)}>
                  {project.cover && (
                    <div
                      className={css.cover}
                      style={{ backgroundImage: `url(${project.cover})` }}
                    />
                  )}

                  <div className={css.info}>
                    {project.logo && (
                      <img className={css.logo} src={project.logo} alt={`${project.name} logo`} />
                    )}

                    <div className={css.right}>
                      <h3>{project.name}</h3>

                      {project.github || project.canister ? (
                        <ul>
                          {project.category && <li>{project.category}</li>}
                          {project.canister && <li>{iDatabase} Deployed to IC</li>}
                          {project.github && <li>{iGithub} Open Source</li>}
                        </ul>
                      ) : null}

                      <p className={css.description}>
                        {project.description && project.description.length > 70
                          ? `${project.description.substring(0, 70)}…`
                          : project.description}
                      </p>

                      <div className={css.upvoteBtn} onClick={(e) => e.stopPropagation()}>
                        <UpvoteBtn idx={project.idx} upvotedBy={project.upvotedBy} />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}

      <LoadMoreBtn />
    </div>
  );
};

export default AppList;
