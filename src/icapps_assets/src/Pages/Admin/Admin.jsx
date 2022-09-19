import React, { useState } from "react";
import css from "./Admin.module.css";

// components
import { Profiles, Projects } from "./index";

// state
import { useDispatch } from "react-redux";
import { setProjectModal, setMode } from "../../State/projectModal";

const Admin = () => {
  const [tab, setTab] = useState("projects");
  const dispatch = useDispatch();

  const addProject = () => {
    dispatch(setMode("add"));
    dispatch(setProjectModal(true));
  };

  const changeTab = (value) => {
    setTab(value);
  };

  return (
    <div className={css.admin}>
      <div className={css.title}>
        <h2 className="pageTitle">Admin</h2>
        <button className="primaryBtn" onClick={addProject}>
          Add project
        </button>
      </div>

      <ul className={css.tabs}>
        <li
          className={tab === "projects" ? `${css.tab} ${css.active}` : css.tab}
          onClick={() => changeTab("projects")}
        >
          Projects
        </li>
        <li
          className={tab === "profiles" ? `${css.tab} ${css.active}` : css.tab}
          onClick={() => changeTab("profiles")}
        >
          Profiles
        </li>
      </ul>

      <div className={css.content}>
        {tab === "projects" ? <Projects /> : tab === "profiles" ? <Profiles /> : ""}
      </div>
    </div>
  );
};

export default Admin;
