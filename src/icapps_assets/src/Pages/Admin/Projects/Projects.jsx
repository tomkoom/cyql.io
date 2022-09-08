import React from "react";
import css from "./Projects.module.css";

// formatters
import {
  formatStr8,
  formatStr24,
  formatWebsite,
  getTwitterUsername,
  formatDiscord,
  formatDate,
} from "../../../Utils/format";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectProjects } from "../../../State/projects";
import { setProjectModal, setProject, setMode } from "../../../State/projectModal";

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);

  const editProject = (project) => {
    dispatch(setMode("edit"));
    dispatch(setProject(project));
    dispatch(setProjectModal(true));
  };

  return (
    <div className={css.projects}>
      {/* <div
        className={css.tableContainer}
        style={{ overflow: "auto", transform: "rotateX(180deg)" }}
      > */}
      <table className={css.table} /* style={{ transform: "rotateX(180deg)" }} */>
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            {/* <th>Slug</th> */}
            <th>Name</th>
            <th>Category</th>
            {/* <th>Website</th>
            <th>Canister</th> */}
            <th>Logo</th>
            <th>Cover</th>
            <th>Twitter</th>
            <th>Discord</th>
            {/* <th>Edited</th>
              <th>Added</th> */}
          </tr>
        </thead>
        <tbody>
          {projects.map((project, i) => (
            <tr key={project.idx} onClick={() => editProject(project)}>
              <td>{i + 1}</td>
              <td>{project.idx && formatStr8(project.idx)}</td>
              {/* <td>{project.id && formatStr8(project.id)}</td> */}
              <td>{project.name && formatStr24(project.name)}</td>
              <td>{project.category}</td>
              {/* <td>{project.website && formatWebsite(project.website)}</td>
              <td>{project.canister && formatWebsite(project.canister)}</td> */}
              <td>{project.logo && formatWebsite(project.logo)}</td>
              <td>{project.cover && formatWebsite(project.cover)}</td>
              <td>{project.twitter && getTwitterUsername(project.twitter)}</td>
              <td>{project.discord && formatDiscord(project.discord)}</td>
              {/* <td>{project.edited ? formatDate(project.edited) : ""}</td>
                <td>{project.added ? formatDate(project.added) : ""}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* </div> */}
    </div>
  );
};

export default Projects;
