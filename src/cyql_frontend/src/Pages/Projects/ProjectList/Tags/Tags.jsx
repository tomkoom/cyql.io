import React from "react";
import css from "./Tags.module.css";

// icons
import { iCircleNodes, iGithub } from "@icons/Icons";

const Tags = ({ category, canister, github }) => {
  return (
    <ul className={css.tags}>
      {category.length > 0 && category.map((c) => <li key={c}>{c}</li>)}
      {canister && <li>{iCircleNodes} onchain</li>}
      {github && <li>{iGithub} open</li>}
    </ul>
  );
};

export default Tags;
