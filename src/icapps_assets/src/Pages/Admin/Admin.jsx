import React from "react";
import css from "./Admin.module.css";

// icons
import { iEdit, iTrash } from "../../Icons/Icons";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectProjects } from "../../State/projects";
import { toAddProject } from "../../Routes/routes";
import { setProjectModal, setProject } from "../../State/projectModal";

const Admin = () => {
  const dispatch = useDispatch();
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

      <div
        className={css.tableContainer}
        style={{ overflow: "auto", transform: "rotateX(180deg)" }}
      >
        <table className={css.table} style={{ transform: "rotateX(180deg)" }}>
          <thead>
            <tr>
              <th>Actions</th>
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
                <td>
                  <div className={css.controls}>
                    <span
                      onClick={() => {
                        dispatch(setProject(project));
                        dispatch(setProjectModal(true));
                      }}
                    >
                      {iEdit}
                    </span>
                    <span>{iTrash}</span>
                  </div>
                </td>
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
    </div>
  );
};

export default Admin;
