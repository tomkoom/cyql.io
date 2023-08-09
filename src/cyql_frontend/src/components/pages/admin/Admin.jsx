import React from "react";
import css from "./Admin.module.css";

// components
import { Projects } from "./index";

// state
import { useAppDispatch } from "@/hooks/useRedux";
import { setProjectModal } from "@/state/modals/projectModal/projectModal";

const Admin = () => {
  const dispatch = useAppDispatch();

  const openModal = () => {
    dispatch(setProjectModal(true));
  };

  return (
    <div className={css.admin}>
      <div className={css.title}>
        <h2 className="pageTitle">admin</h2>
        <button className="primaryBtn" onClick={openModal}>
          add project
        </button>
      </div>
      <Projects />
    </div>
  );
};

export default Admin;
