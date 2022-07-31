import React from "react";
import css from "./HighlightedByCategory.module.css";

// state
import { useSelector } from "react-redux";
import { selectProjects } from "../../../State/projects";
import { toApp } from "../../../Routes/routes";

const HighlightedByCategory = ({ filter }) => {
  const projects = useSelector(selectProjects);

  const sort = (a, b) => {
    if (a.priority && b.priority) {
      return b.priority - a.priority;
    } else if (a.priority && !b.priority) {
      return -1;
    } else if (!a.priority && b.priority) {
      return 1;
    }
    return 0;
  };

  return (
    <ul className={css.highlightedByCat}>
      {projects
        .filter((p) => p.category === filter)
        .slice(0, 16)
        .sort((a, b) => sort(a, b))
        .map((p) => (
          <li className={css.project} key={p.idx} onClick={() => toApp(p.id)}>
            <img className={css.logo} src={p.logo} alt={`${p.name}-logo`} />
            <div>
              <h4 className={css.name}>{p.name}</h4>
              <p className={css.description}>
                {p.description && p.description.length > 70
                  ? `${p.description.substring(0, 70)}…`
                  : p.description}
              </p>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default HighlightedByCategory;
