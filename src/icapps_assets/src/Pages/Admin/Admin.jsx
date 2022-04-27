import React, { useState, useEffect } from "react";
import css from "./Admin.module.css";

// components
import { AddProjectModal } from "./index";

// redux
import { useSelector } from "react-redux";
import { selectProjects } from "../../State/projects";
import { toAddProject } from "../../Routes/routes";

const Admin = () => {
  const [openModal, setOpenModal] = useState(false);
  const projects = useSelector(selectProjects);

  const handleString = (string) => {
    let str = string;
    str = str.includes("https://")
      ? str.split("https://")[1]
      : str.includes("http://")
      ? str.split("http://")[1]
      : str.includes("www.")
      ? str.split("www.")[1]
      : str;
    str = str.includes("www.") ? str.split("www.")[1] : str;
    str = str.length > 8 ? `${str.substring(0, 8)}…` : str;
    return str;
  };

  return (
    <div className={css.admin}>
      <div className={css.title}>
        <h2 className="pageTitle">Admin</h2>
        <button className="secondaryBtn" onClick={toAddProject}>
          Add project
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>idx</th>
            <th>id</th>
            <th>name</th>
            <th>category</th>
            <th>website</th>
            <th>canister</th>
            <th>logo</th>
            <th>cover</th>
            <th>twitter</th>
            <th>discord</th>
            <th>added</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.idx}>
              <td>{project.idx && handleString(project.idx)}</td>
              <td>{project.id && handleString(project.id)}</td>
              <td>{project.name && handleString(project.name)}</td>
              <td>{project.category}</td>
              <td>{project.website && handleString(project.website)}</td>
              <td>{project.canister && handleString(project.canister)}</td>
              <td>{project.logo && handleString(project.logo)}</td>
              <td>{project.cover && handleString(project.cover)}</td>
              <td>{project.twitter && handleString(project.twitter)}</td>
              <td>{project.discord && handleString(project.discord)}</td>
              <td>{project.added && Date(project.added * 1000)}</td>
              {/* <td>{project.added ? project.added : ""}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {openModal && <AddProjectModal openModal={openModal} setOpenModal={setOpenModal} />}
    </div>
  );
};

export default Admin;
