import React, { useEffect } from "react";
import css from "./ProjectModal.module.css";

// components
import { Controls, FormContent, Header } from "./index";
import { Loader } from "@components/index";

// state
import { useDispatch, useSelector } from "react-redux";
import { setCloseProjectModal } from "@state/modals/projectModal/projectModal";
import {
  selectProjectModalLoadingAdd,
  selectProjectModalLoadingEdit,
  selectProjectModalLoadingDel,
} from "@state/modals/projectModal/projectModalLoading";

const ProjectModal = () => {
  const dispatch = useDispatch();
  const addIsLoading = useSelector(selectProjectModalLoadingAdd);
  const editIsLoading = useSelector(selectProjectModalLoadingEdit);
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
      {/* loading (?) */}

      {addIsLoading || editIsLoading || delIsLoading ? (
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
