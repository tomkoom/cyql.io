import React, { useEffect } from "react";
import css from "./ProjectModal.module.css";

// components
import { Controls, FormContent, Header } from "./index";

// state
import { useDispatch } from "react-redux";
import { setCloseProjectModal } from "@state/modals/projectModal";

const ProjectModal = () => {
  const dispatch = useDispatch();

  // close modal on esc
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        dispatch(setCloseProjectModal());
      }
    };
    document.body.addEventListener("keydown", close);
    return () => {
      document.body.removeEventListener("keydown", close);
    };
  }, []);

  // add has token

  return (
    <div className={css.modal}>
      <div className={css.content}>
        <Header />

        <div className={css.form}>
          <FormContent />
          <Controls />
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
