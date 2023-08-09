import React, { useEffect } from "react";
import css from "./ProjectModal.module.css";

// components
import { Controls, FormContent, Header } from "./index";
import { Loader } from "@/components/ui/_index";

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setCloseProjectModal } from "@/state/modals/projectModal/projectModal";
import {
  selectProjectModalLoadingSet,
  selectProjectModalLoadingDel,
} from "@/state/modals/projectModal/projectModalLoading";

const ProjectModal = () => {
  const dispatch = useAppDispatch();
  const setIsLoading = useAppSelector(selectProjectModalLoadingSet);
  const delIsLoading = useAppSelector(selectProjectModalLoadingDel);

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
