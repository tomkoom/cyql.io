import React from "react";
import css from "./Admin.module.css";

// formatters
import {
  formatStr8,
  formatStr16,
  formatWebsite,
  getTwitterUsername,
  formatDiscord,
  formatDate,
  formatString,
} from "./formatters";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectProjects } from "../../State/projects";
import { setProjectModal, setProject, setMode } from "../../State/projectModal";

const Admin = () => {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);

  const addProject = () => {
    dispatch(setMode("add"));
    dispatch(setProjectModal(true));
  };

  const editProject = (project) => {
    dispatch(setMode("edit"));
    dispatch(setProject(project));
    dispatch(setProjectModal(true));
  };

  return (
    <div className={css.admin}>
      <div className={css.title}>
        <h2 className="pageTitle">Admin</h2>
        <button className="primaryBtn" onClick={addProject}>
          Add project
        </button>
      </div>

      <div
        className={css.tableContainer}
        style={{ overflow: "auto", transform: "rotateX(180deg)" }}
      >
        <table className={css.table} style={{ transform: "rotateX(180deg)" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Idx</th>
              <th>Slug</th>
              <th>Name</th>
              <th>Category</th>
              <th>Website</th>
              <th>Canister</th>
              <th>Logo</th>
              <th>Cover</th>
              <th>Twitter</th>
              <th>Discord</th>
              <th>Added</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, i) => (
              <tr key={project.idx} onClick={() => editProject(project)}>
                <td>{i + 1}</td>
                <td>{project.idx && formatStr8(project.idx)}</td>
                <td>{project.id && formatStr16(project.id)}</td>
                <td>{project.name && formatStr16(project.name)}</td>
                <td>{project.category}</td>
                <td>{project.website && formatWebsite(project.website)}</td>
                <td>{project.canister && formatString(project.canister)}</td>
                <td>{project.logo && formatString(project.logo)}</td>
                <td>{project.cover && formatString(project.cover)}</td>
                <td>{project.twitter && getTwitterUsername(project.twitter)}</td>
                <td>{project.discord && formatDiscord(project.discord)}</td>
                <td>{project.added ? formatDate(project.added) : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
