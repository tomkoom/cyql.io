import React from "react";
import css from "./EditBtn.module.css";

// icons
import { iEdit } from "@icons/Icons";

// state
import { useDispatch } from "react-redux";
import { setProjectModal, setProject, setMode } from "@state/modals/projectModal";

const EditBtn = ({ project }) => {
  const dispatch = useDispatch();
  const editProject = () => {
    dispatch(setMode("edit"));
    dispatch(setProject(project));
    dispatch(setProjectModal(true));
  };

  return (
    <button className={css.btn} onClick={editProject}>
      <span className={css.icon}>{iEdit}</span>
    </button>
  );
};

export default EditBtn;
