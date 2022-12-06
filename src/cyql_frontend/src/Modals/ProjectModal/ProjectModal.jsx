import React, { useState, useEffect } from "react";
import css from "./ProjectModal.module.css";

// firestore
import { doc, addDoc, setDoc, deleteDoc } from "firebase/firestore";
import { pColRef } from "@firestore/firestore-collections";

// components
import { FormContent, Header } from "./index";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectProject, selectMode, setCloseProjectModal } from "@state/modals/projectModal";

const ProjectModal = () => {
  const dispatch = useDispatch();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const p = useSelector(selectProject);
  const mode = useSelector(selectMode);

  const submit = async () => {
    const ts = Date.now();
    if (mode === "add") {
      await addDoc(pColRef, { ...p, added: ts }).catch((e) => console.log(e));
    } else if (mode === "edit") {
      const d = doc(pColRef, p.id);
      await setDoc(d, { ...p, edited: ts }).catch((e) => console.log(e));
    }
    closeModal();
  };

  const closeModal = () => {
    dispatch(setCloseProjectModal());
  };

  const deleteProject = async () => {
    const d = doc(pColRef, p.id);
    await deleteDoc(d).catch((e) => console.log(e));
    closeModal();
  };

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
        <Header name={p.name} id={p.id} />

        <div className={css.form}>
          <FormContent />

          <div className={css.controls}>
            {!deleteConfirm ? (
              <button id={css.alertBtn} className="alertBtn" onClick={() => setDeleteConfirm(true)}>
                Delete
              </button>
            ) : (
              <div className={css.deleteContainer}>
                <button className="secondaryBtn" onClick={() => setDeleteConfirm(false)}>
                  Cancel
                </button>
                <button id={css.alertBtn} className="alertBtn" onClick={deleteProject}>
                  Confirm
                </button>
              </div>
            )}

            <button className="secondaryBtn" onClick={closeModal}>
              Cancel
            </button>
            <button className="primaryBtn" onClick={submit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
