import React from "react";
import css from "./HighlightedByCategory.module.css";

// icons
import { iCheckCircle } from "@icons/Icons";

// state
import { useSelector } from "react-redux";
import { selectJunoProjects } from "@state/junoProjects";
import { toApp } from "@routes/routes";

// components
import { UpvtBtn } from "@components/index";
import { Logo } from "./index";

const HighlightedByCategory = ({ filter }) => {
  const projects = useSelector(selectJunoProjects);

  const sortByVerified = (a, b) => {
    return a.verified === b.verified ? 0 : a.verified ? -1 : 1;
  };

  const sortByUpvoted = (a, b) => {
    if (a.upvotedBy && b.upvotedBy) {
      return b.upvotedBy.length - a.upvotedBy.length;
    } else if (!a.upvotedBy && b.upvotedBy) {
      return 1;
    } else if (a.upvotedBy && !b.upvotedBy) {
      return -1;
    }
    return 0;
  };

  const openProject = (slug) => {
    toApp(slug);
  };

  return (
    <ul className={css.projects}>
      {projects
        .filter((project) => project.category.includes(filter))
        .sort((a, b) => sortByUpvoted(a, b))
        .sort((a, b) => sortByVerified(a, b))
        .slice(0, 16)
        .map((project) => (
          <li
            className={css.project}
            onClick={() => openProject(project.slug)}
            key={project.__id__}
          >
            <div className={css.main}>
              <Logo logo={project.logo} name={project.name} />
              <div>
                <div className={css.titleContainer}>
                  {project.verified && <span className={css.icon}>{iCheckCircle}</span>}
                  <h4 className={css.title}>{project.name}</h4>
                </div>

                <p className={css.description}>
                  {project.description && project.description.length > 60
                    ? `${project.description.substring(0, 60)}…`
                    : project.description}
                </p>
              </div>
            </div>

            {/* upvote button */}
            <div className={css.upvoteBtn} onClick={(e) => e.stopPropagation()}>
              <UpvtBtn id={project.__id__} upvotedBy={project.upvotedBy} />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default HighlightedByCategory;
