import React from "react";
import css from "./Tags.module.css";

// icons
import { iGithub, iCircleNodes, iMeteor } from "@icons/Icons";

const Tags = ({ category, github, canister, grantee }) => {
  return (
    <ul className={css.tags}>
      {category.length > 0 &&
        category.map((c) => (
          <li className={css.tagsI} key={c}>
            {c.toLowerCase()}
          </li>
        ))}
      {github && (
        <li id={css.open} className={css.tagsI}>
          {iGithub} open
        </li>
      )}
      {canister && (
        <li id={css.onchain} className={css.tagsI}>
          {iCircleNodes} onchain
        </li>
      )}
      {grantee && (
        <li id={css.grantee} className={css.tagsI}>
          {iMeteor} grantee
        </li>
      )}
    </ul>
  );
};

export default Tags;
