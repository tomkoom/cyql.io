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

  const formatStr8 = (str) => {
    return str.length > 8 ? `${str.substring(0, 8)}…` : str;
  };

  const formatStr16 = (str) => {
    return str.length > 16 ? `${str.substring(0, 16)}…` : str;
  };

  const formatWebsite = (url) => {
    let formattedURL = url.replace(/(^\w+:|^)\/\//, "");
    formattedURL = formattedURL.replace(/\/$/, ""); // remove trailing slash

    return formattedURL.length > 12 ? `${formattedURL.substring(0, 16)}…` : formattedURL;
  };

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

  const getTwitterUsername = (url) => {
    const username = url.split(".com/")[1];
    return username;
  };

  const formatDiscord = (url) => {
    if (url.includes("discord.gg/")) {
      return url.split("discord.gg/")[1];
    }
    if (url.includes("discord.com/")) {
      return url.split("discord.com/")[1];
    }
    return url;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString("en-GB");
  };

  return (
    <div className={css.admin}>
      <div className={css.title}>
        <h2 className="pageTitle">Admin</h2>
        <button className="primaryBtn" onClick={toAddProject}>
          Add project
        </button>
      </div>

      <div style={{ overflow: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Idx</th>
              <th>Id</th>
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
            {projects.map((project) => (
              <tr key={project.idx}>
                <td>{project.idx && formatStr8(project.idx)}</td>
                <td>{project.id && formatStr16(project.id)}</td>
                <td>{project.name && formatStr16(project.name)}</td>
                <td>{project.category}</td>
                <td>{project.website && formatWebsite(project.website)}</td>
                <td>{project.canister && handleString(project.canister)}</td>
                <td>{project.logo && handleString(project.logo)}</td>
                <td>{project.cover && handleString(project.cover)}</td>
                <td>{project.twitter && getTwitterUsername(project.twitter)}</td>
                <td>{project.discord && formatDiscord(project.discord)}</td>
                <td>{project.added ? formatDate(project.added) : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openModal && <AddProjectModal openModal={openModal} setOpenModal={setOpenModal} />}
    </div>
  );
};

export default Admin;
