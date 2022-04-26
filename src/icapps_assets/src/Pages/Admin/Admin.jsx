import React from "react";
import css from "./Admin.module.css";

// redux
import { useSelector } from "react-redux";
import { selectProjects } from "../../State/projects";

const Admin = () => {
  const projects = useSelector(selectProjects);

  const openModal = () => {
    console.log("123");
  };

  const addProject = () => {
    console.log("add project");
  };

  return (
    <div className={css.admin}>
      <div className={css.title}>
        <h2 className="pageTitle">Admin</h2>
        <button className="secondaryBtn" onClick={addProject}>
          Add project
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>idx</th>
            <th>slug</th>
            <th>name</th>
            <th>category</th>
            <th>website</th>
            <th>canister</th>
            <th>added</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.idx} onClick={openModal}>
              <td>{`${project.idx.substring(0, 8)}…`}</td>
              <td>{project.id}</td>
              <td>
                {project.name && project.name.length > 24
                  ? `${project.name.substring(0, 24)}…`
                  : project.name}
              </td>
              <td>{project.category}</td>
              <td>
                {project.website && project.website.length > 16
                  ? `${project.website.substring(0, 16)}…`
                  : project.website}
              </td>
              <td>{project.canister && `${project.canister.substring(0, 16)}…`}</td>
              <td>{project.added}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
