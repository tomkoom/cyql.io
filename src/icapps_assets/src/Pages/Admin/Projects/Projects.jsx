import React, { useState } from "react";
import css from "./Projects.module.css";

// formatters
import {
  formatStr12,
  formatStr16,
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

      <div className={css.table}>
        <div className={css.rowHeader}>
          <div className={css.coll25}>
            <p>#</p>
          </div>
          <div className={css.coll139}>
            <p>Id</p>
          </div>
          <div className={css.coll139}>
            <p>Name</p>
          </div>
          <div className={css.coll139}>
            <p>Category</p>
          </div>
          <div className={css.coll139}>
            <p>Logo</p>
          </div>
          <div className={css.coll139}>
            <p>Cover</p>
          </div>
          <div className={css.coll139}>
            <p>Twitter</p>
          </div>
          <div className={css.coll139}>
            <p>Discord</p>
          </div>
        </div>

        {projects
          .filter((project) => {
            if (search === "") {
              return project;
            } else if (project.name.toLowerCase().includes(search.toLowerCase())) {
              return project;
            }
          })
          .map((project, i) => (
            <div className={css.row} key={project.idx} onClick={() => editProject(project)}>
              <div className={css.coll25}>
                <p>{projects.length - i}</p>
              </div>
              <div className={css.coll139}>
                <p>{project.idx && formatStr12(project.idx)}</p>
              </div>
              <div className={css.coll139}>
                <p>{project.name && formatStr16(project.name)}</p>
              </div>
              <div className={css.coll139}>
                <p>{project.category}</p>
              </div>
              <div className={css.coll139}>
                <p>{project.logo && formatWebsite(project.logo)}</p>
              </div>
              <div className={css.coll139}>
                <p>{project.cover && formatWebsite(project.cover)}</p>
              </div>
              <div className={css.coll139}>
                {project.twitter && getTwitterUsername(project.twitter)}
              </div>
              <div className={css.coll139}>
                <p>{project.discord && formatDiscord(project.discord)}</p>
              </div>
            </div>
          ))}
      </div>
      {/* </div> */}
    </div>
  );
};

export default Projects;
