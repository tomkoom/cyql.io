import React from "react";
import css from "./Main.module.css";

// icons
import { iGithub, iCircleNodes } from "@icons/Icons";

const Main = ({ name, category, canister, github, description }) => {
  const formatName = (n) => {
    return n && n.length > 15 ? `${n.substring(0, 15)}…` : n;
  };

  const formatDescription = (d) => {
    return d && d.length > 35 ? `${d.substring(0, 35)}…` : d;
  };

  return (
    <div className={css.main}>
      <h3 className={css.title}>{formatName(name)}</h3>
      <span className={css.tags}>
        {category.length > 0 && category.join(", ")}{" "}
        {canister && <span>{iCircleNodes} onchain</span>} {github && <span>{iGithub} open</span>}
      </span>

      <p className={css.description}>{formatDescription(description)}</p>
    </div>
  );
};

export default Main;
