import React from "react";
import css from "./Projects.module.css";

// components
import { Categories, ProjectList, SearchBar, Tags } from "./index";

const Projects = () => {
  return (
    <main className={css.apps}>
      <h2 className="pageTitle">Discover new projects</h2>
      <SearchBar />
      <Categories />
      {/* <Tags /> */}
      <ProjectList />
    </main>
  );
};

export default Projects;
