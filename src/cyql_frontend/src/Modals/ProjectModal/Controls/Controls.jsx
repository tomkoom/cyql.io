import React, { useState } from "react";
import css from "./Controls.module.css";

// firestore
import { doc, addDoc, setDoc, deleteDoc } from "firebase/firestore";
import { pColRef } from "@firestore/firestore-collections";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectProject, selectMode, setCloseProjectModal } from "@state/modals/projectModal";

const Controls = () => {
  const dispatch = useDispatch();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const mode = useSelector(selectMode);
  const p = useSelector(selectProject);

  const submitProject = async () => {
    const ts = Date.now();
    if (mode === "add") {
      await addDoc(pColRef, { ...p, added: ts }).catch((e) => console.log(e));
    } else if (mode === "edit") {
      const d = doc(pColRef, p.id);
      await setDoc(d, { ...p, edited: ts }).catch((e) => console.log(e));
    }
    closeModal();
  };

  const deleteProject = async () => {
    const d = doc(pColRef, p.id);
    await deleteDoc(d).catch((e) => console.log(e));
    closeModal();
  };

  const closeModal = () => {
    dispatch(setCloseProjectModal());
  };

  return (
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
      <button className="primaryBtn" onClick={submitProject}>
        Save
      </button>
    </div>
  );
};

export default Controls;
