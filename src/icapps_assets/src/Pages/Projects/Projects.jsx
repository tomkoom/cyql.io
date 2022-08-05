import React from "react";
import css from "./Projects.module.css";

// components
import { Category, Filter, ProjectList, Search, Sort } from "./index";

const Projects = () => {
  return (
    <main className={css.apps}>
      <h2 className="pageTitle">Discover new projects</h2>
      <Search />
      <div className={css.controls}>
        <Category />
        <Sort />
        <Filter />
      </div>
      <ProjectList />
      {/* <Tags /> */}
    </main>
  );
};

export default Projects;
