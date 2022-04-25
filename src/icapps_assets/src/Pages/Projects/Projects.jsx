import React, { useState } from "react";
import css from "./Projects.module.css";

// components
import { Categories, ProjectList, SearchBar, Tags } from "./index";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setSearchProjects } from "../../State/searchProjects";

const Projects = () => {
  const [category, setCategory] = useState("All");

  const dispatch = useDispatch();
  const searchProjectsValue = useSelector((state) => state.searchProjects.search);

  const searchProjects = (e) => {
    dispatch(setSearchProjects(e.target.value));
  };

  return (
    <main className={css.apps}>
      <h2 className="pageTitle">Discover new projects</h2>

      <SearchBar
        searchValue={searchProjectsValue}
        search={searchProjects}
        inputName="projects-search"
      />

      <Categories />

      {/* <Tags /> */}

      <ProjectList />
    </main>
  );
};

export default Projects;
