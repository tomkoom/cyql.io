import React, { useState } from "react";
import css from "./Admin.module.css";

// components
import { Projects } from "./index";

// state
import { useAppDispatch } from "@/hooks/useRedux";
import { setProjectModal } from "@/state/modals/projectModal/projectModal";

const Admin = () => {
  const dispatch = useAppDispatch();

  const addProject = () => {
    dispatch(setProjectModal(true));
  };

  return (
    <div className={css.admin}>
      <div className={css.title}>
        <h2 className="pageTitle">admin</h2>
        <button className="primaryBtn" onClick={addProject}>
          add project
        </button>
      </div>
      <Projects />
    </div>
  );
};

export default Admin;
