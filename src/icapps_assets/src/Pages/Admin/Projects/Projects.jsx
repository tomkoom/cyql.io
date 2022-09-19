import React, { useState } from "react";
import css from "./Projects.module.css";

// formatters
import {
  formatStr12,
  formatStr24,
  formatWebsite,
  getTwitterUsername,
  formatDiscord,
} from "../../../Utils/format";

// components
import Search from "./Search/Search";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectProjects } from "../../../State/projects";
import { setProjectModal, setProject, setMode } from "../../../State/projectModal";

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const [search, setSearch] = useState("");

  const editProject = (project) => {
    dispatch(setMode("edit"));
    dispatch(setProject(project));
    dispatch(setProjectModal(true));
  };

  return (
    <div className={css.projects}>
      <Search setSearch={setSearch} />

      <table className={css.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>Name</th>
            <th>Category</th>
            <th>Logo</th>
            <th>Cover</th>
            <th>Twitter</th>
            <th>Discord</th>
          </tr>
        </thead>
        <tbody>
          {projects
            .filter((project) => {
              if (search === "") {
                return project;
              } else if (project.name.toLowerCase().includes(search.toLowerCase())) {
                return project;
              }
            })
            .map((project, i) => (
              <tr key={project.idx} onClick={() => editProject(project)}>
                <td>{projects.length - i}</td>
                <td>{project.idx && formatStr12(project.idx)}</td>
                <td>{project.name && formatStr24(project.name)}</td>
                <td>{project.category}</td>
                <td>{project.logo && formatWebsite(project.logo)}</td>
                <td>{project.cover && formatWebsite(project.cover)}</td>
                <td>{project.twitter && getTwitterUsername(project.twitter)}</td>
                <td>{project.discord && formatDiscord(project.discord)}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* </div> */}
    </div>
  );
};

export default Projects;
