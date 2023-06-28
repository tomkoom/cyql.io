import React, { useEffect } from "react";
import css from "./ProjectModal.module.css";

// components
import { Controls, FormContent, Header } from "./index";
import { Loader } from "@/components/ui-elements/index";

// state
import { useDispatch, useSelector } from "react-redux";
import { setCloseProjectModal } from "@/state/modals/projectModal/projectModal";
import {
  selectProjectModalLoadingSet,
  selectProjectModalLoadingDel,
} from "@/state/modals/projectModal/projectModalLoading";

const ProjectModal = () => {
  const dispatch = useDispatch();
  const setIsLoading = useSelector(selectProjectModalLoadingSet);
  const delIsLoading = useSelector(selectProjectModalLoadingDel);

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

  return (
    <div className={css.modal}>
      {setIsLoading || delIsLoading ? (
        <Loader />
      ) : (
        <div className={css.content}>
          <Header />

          <div className={css.form}>
            <FormContent />
            <Controls />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectModal;
