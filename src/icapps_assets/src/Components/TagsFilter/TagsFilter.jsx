import React from "react";
import css from "./TagsFilter.module.css";

const TagsFilter = () => {
  return (
    <ul className={css.tagsFilter}>
      <li className={css.tagsFilter__item}>
        <input type="checkbox" id="openSource" name="tag" value="Open Source" />
        <label htmlFor="openSource">Open Source</label>
      </li>
      <li className={css.tagsFilter__item}>
        <input
          type="checkbox"
          id="icDeployed"
          name="tag"
          value="Deployed to IC"
        />
        <label htmlFor="icDeployed">Deployed to IC</label>
      </li>
    </ul>
  );
};

export default TagsFilter;
