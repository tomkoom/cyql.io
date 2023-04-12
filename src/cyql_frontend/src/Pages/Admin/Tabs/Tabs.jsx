import React from "react";
import css from "./Tabs.module.css";

const Tabs = ({ tab, setTab }) => {
  const changeTab = (value) => {
    setTab(value);
  };

  return (
    <ul className={css.tabs}>
      <li
        className={tab === "projects" ? `${css.tab} ${css.active}` : css.tab}
        onClick={() => changeTab("projects")}
      >
        projects
      </li>
      <li
        className={tab === "profiles" ? `${css.tab} ${css.active}` : css.tab}
        onClick={() => changeTab("profiles")}
      >
        profiles
      </li>
    </ul>
  );
};

export default Tabs;
