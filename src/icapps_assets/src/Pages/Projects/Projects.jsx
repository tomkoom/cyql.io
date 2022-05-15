import React from "react";
import css from "./Projects.module.css";

// components
import { Categories, ProjectList, SearchBar, Tags, Sort } from "./index";

const Projects = () => {
  return (
    <main className={css.apps}>
      <h2 className="pageTitle">Discover new projects</h2>
      <SearchBar />
      <Categories />
      {/* <Tags /> */}
      <Sort />
      <ProjectList />
    </main>
  );
};

export default Projects;
