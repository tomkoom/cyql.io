import React from "react";
import css from "./HighlightedByCategory.module.css";

// icons
import { iCheckCircle } from "../../../Icons/Icons";

// state
import { useSelector } from "react-redux";
import { selectProjects } from "../../../State/projects";
import { toApp } from "../../../Routes/routes";

// components
import { UpvoteBtn2 } from "../../../Components/index";

const HighlightedByCategory = ({ filter }) => {
  const projects = useSelector(selectProjects);

  const sortByVerified = (a, b) => {
    return a.verified === b.verified ? 0 : a.verified ? -1 : 1;
  };

  const sortByUpvoted = (a, b) => {
    return b.upvotedBy.length - a.upvotedBy.length;
  };

  return (
    <ul className={css.projects}>
      {projects
        .filter((p) => p.category === filter)
        // sort by upvoted
        .filter((p) => p.upvotedBy && p.upvotedBy.length > 0)
        .sort((a, b) => sortByUpvoted(a, b))
        // sort by verified
        .sort((a, b) => sortByVerified(a, b))
        // slice
        .slice(0, 16)
        .map((p) => (
          <li className={css.projectsI} key={p.idx} onClick={() => toApp(p.id)}>
            <div className={css.main}>
              <img className={css.logo} src={p.logo} alt={`${p.name}-logo`} />
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
            <div className={css.upvoteBtn}>
              <UpvoteBtn2 idx={p.idx} upvotedBy={p.upvotedBy} />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default HighlightedByCategory;
