import React from "react";
import css from "./EditBtn.module.css";

// icons
import { iEdit } from "@icons/Icons";

// state
import { useDispatch } from "react-redux";
import { setProjectModal, setProjectDoc, setMode } from "@state/modals/projectModal/projectModal";

const EditBtn = ({ projectDoc }) => {
  const dispatch = useDispatch();
  const editProject = () => {
    dispatch(setMode("edit"));
    dispatch(setProjectDoc(projectDoc));
    dispatch(setProjectModal(true));
  };

  return (
    <button className={css.btn} onClick={editProject}>
      <span className={css.icon}>{iEdit}</span>
    </button>
  );
};

export default EditBtn;
