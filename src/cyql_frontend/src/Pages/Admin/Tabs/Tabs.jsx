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
        Projects
      </li>
      <li
        className={tab === "profiles" ? `${css.tab} ${css.active}` : css.tab}
        onClick={() => changeTab("profiles")}
      >
        Profiles
      </li>
    </ul>
  );
};

export default Tabs;
