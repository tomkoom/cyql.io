import React from "react";
import css from "./Main.module.css";

// icons
import { iGithub, iDatabase } from "@icons/Icons";

const Main = ({ name, category, canister, github, description }) => {
  return (
    <div className={css.main}>
      <h3 className={css.title}>{name}</h3>
      <ul className={css.tags}>
        {category.length > 0 && <li className={css.tagsI}>{category.join(", ")}</li>}
        {canister && <li className={css.tagsI}>{iDatabase} On-Chain</li>}
        {github && <li className={css.tagsI}>{iGithub} Open Source</li>}
      </ul>

      <p className={css.description}>
        {description && description.length > 60 ? `${description.substring(0, 60)}…` : description}
      </p>
    </div>
  );
};

export default Main;
