import React from "react";
import css from "./HighlightedByCategory.module.css";

// icons
import { iCheckCircle } from "@icons/Icons";

// state
import { useSelector } from "react-redux";
import { selectProjectsDocs } from "@state/projects";
import { toApp } from "@routes/routes";

// components
import { UpvtBtn } from "@components/index";
import { Logo } from "./index";

const HighlightedByCategory = ({ filter }) => {
  const projects = useSelector(selectProjectsDocs);

  const sortByUpvoted = (a, b) => {
    const aUp = a.data.upvotedBy;
    const bUp = b.data.upvotedBy;
    if (aUp && bUp) {
      return bUp.length - aUp.length;
    } else if (!aUp && bUp) {
      return 1;
    } else if (aUp && !bUp) {
      return -1;
    }
    return 0;
  };

  const sortByVerified = (a, b) => {
    return a.data.verified === b.data.verified ? 0 : a.data.verified ? -1 : 1;
  };

  const formatDescription = (d) => {
    return d.length > 60 ? `${d.substring(0, 60)}…` : d;
  };

  const openProject = (slug) => {
    toApp(slug);
  };

  return (
    <ul className={css.projects}>
      {projects
        .filter((project) => project.data.category.includes(filter))
        .sort((a, b) => sortByUpvoted(a, b))
        .sort((a, b) => sortByVerified(a, b))
        .slice(0, 16)
        .map((project) => (
          <li
            className={css.project}
            onClick={() => openProject(project.data.slug)}
            key={project.key}
          >
            <div className={css.main}>
              <Logo logo={project.data.logo} name={project.data.name} />
              <div>
                <div className={css.titleContainer}>
                  {project.data.verified && <span className={css.icon}>{iCheckCircle}</span>}
                  <h4 className={css.title}>{project.data.name}</h4>
                </div>

                <p className={css.description}>
                  {project.data.description && formatDescription(project.data.description)}
                </p>
              </div>
            </div>

            {/* upvote button */}
            {/* <div className={css.upvoteBtn} onClick={(e) => e.stopPropagation()}>
              <UpvtBtn id={project.key} upvotedBy={project.data.upvotedBy} />
            </div> */}
          </li>
        ))}
    </ul>
  );
};

export default HighlightedByCategory;
