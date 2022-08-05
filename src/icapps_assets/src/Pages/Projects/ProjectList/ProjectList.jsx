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
import { selectSort } from "../../../State/sort";
import { selectFilterByOpenSource } from "../../../State/filter";

const AppList = () => {
  const projects = useSelector(selectProjects);
  const category = useSelector(selectCategory);
  const search = useSelector(selectSearch);
  const itemsVisible = useSelector(selectItemsVisible);
  const sort = useSelector(selectSort);
  const filterOpenSource = useSelector(selectFilterByOpenSource);

  const sortByUpvotes = (a, b) => {
    if (a.upvotedBy && b.upvotedBy) {
      return b.upvotedBy.length - a.upvotedBy.length;
    } else if (!a.upvotedBy && b.upvotedBy) {
      return 1;
    } else if (a.upvotedBy && !b.upvotedBy) {
      return -1;
    } else return 0;
  };

  return (
    <div>
      {projects.length < 1 ? (
        <Loader />
      ) : (
        <ul className={css.li}>
          {projects
            // category
            .filter((project) => (category === "All" ? project : project.category === category))
            // search query
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
            // open source
            .filter((project) => {
              if (filterOpenSource === "all") {
                return project;
              } else if (filterOpenSource === "true") {
                return project.github !== "";
              } else if (filterOpenSource === "false") {
                return project.github === "";
              }
            })
            .sort((a, b) => (sort === "upvotes" ? sortByUpvotes(a, b) : null))
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

                      <ul>
                        {project.category && <li>{project.category}</li>}
                        {project.canister && <li>{iDatabase} Deployed to IC</li>}
                        {project.github && <li>{iGithub} Open Source</li>}
                      </ul>

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
