import React from "react";
import css from "./HighlightedByCategory.module.css";

// icons
import { iCheckCircle } from "@icons/Icons";

// state
import { useSelector } from "react-redux";
import { selectProjects } from "@state/projects";
import { toApp } from "@routes/routes";

// components
import { UpvtBtn } from "@components/index";
import { Logo } from "./index";

const HighlightedByCategory = ({ filter }) => {
  const projects = useSelector(selectProjects);

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
        .filter((p) => p.category.includes(filter))
        .sort((a, b) => sortByUpvoted(a, b))
        .sort((a, b) => sortByVerified(a, b))
        .slice(0, 16)
        .map((p) => (
          <li className={css.p} key={p.id} onClick={() => openProject(p.slug)}>
            <div className={css.main}>
              <Logo logo={p.logo} name={p.name} />
              <div>
                <div className={css.titleContainer}>
                  {p.verified && <span className={css.icon}>{iCheckCircle}</span>}
                  <h4 className={css.title}>{p.name}</h4>
                </div>

                <p className={css.description}>
                  {p.description && p.description.length > 60
                    ? `${p.description.substring(0, 60)}…`
                    : p.description}
                </p>
              </div>
            </div>
            <div className={css.upvoteBtn} onClick={(e) => e.stopPropagation()}>
              <UpvtBtn id={p.id} upvotedBy={p.upvotedBy} />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default HighlightedByCategory;
