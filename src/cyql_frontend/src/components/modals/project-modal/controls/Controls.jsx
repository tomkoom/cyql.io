import React, { useState } from "react";
import css from "./Controls.module.css";

// juno
import { junoCollectionProjects } from "@constants/constants";
import { getDoc, setDoc, delDoc } from "@junobuild/core";
import { getProjectsDocs } from "@juno/juno";

// components
import { Btn } from "./index";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectProjectDoc, setCloseProjectModal } from "@state/modals/projectModal/projectModal";
import {
  setProjectModalLoadingSet,
  setProjectModalLoadingDel,
} from "@state/modals/projectModal/projectModalLoading";

// project id
import { nanoid } from "@utils/projectId";

const Controls = () => {
  const dispatch = useDispatch();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const project = useSelector(selectProjectDoc);
  const collection = junoCollectionProjects;

  const get = async (key) => {
    return getDoc({ collection, key });
  };

  const closeModal = () => {
    dispatch(setCloseProjectModal());
  };

  const confirmDeletion = () => {
    setDeleteConfirm(true);
  };

  const cancelDeletion = () => {
    setDeleteConfirm(false);
  };

  const submitProject = async () => {
    const timestamp = Date.now();

    // check if doc exists
    const doc = await get(project.key);
    const key = doc === undefined ? nanoid() : project.key;

    dispatch(setProjectModalLoadingSet(true));
    await setDoc({
      collection,
      doc: {
        key,
        data: {
          ...project.data,
          ...(doc === undefined ? { added: timestamp } : { updated: timestamp }),
        },
        ...(doc !== undefined && { updated_at: doc.updated_at }),
      },
    })
      .then(() => console.log("Doc set with the id", key))
      .catch((e) => console.log(e));

    // update projects
    await getProjectsDocs();
    dispatch(setProjectModalLoadingSet(false));
    closeModal();
  };

  const deleteProject = async () => {
    dispatch(setProjectModalLoadingDel(true));
    const doc = await get(project.key);
    await delDoc({ collection, doc })
      .then(() => console.log(`Doc with the id ${project.key} deleted.`))
      .catch((e) => console.log(e));

    dispatch(setProjectModalLoadingDel(false));
    closeModal();
  };

  return (
    <div className={css.controls}>
      {deleteConfirm === false ? (
        <div className={css.deleteBtn}>
          <Btn type="alertBtn" text="delete" onClick={confirmDeletion} />
        </div>
      ) : (
        <div className={css.deleteContainer}>
          <Btn type="secondaryBtn" text="cancel" onClick={cancelDeletion} />
          <Btn type="alertBtn" text="confirm" onClick={deleteProject} />
        </div>
      )}

      <Btn type="secondaryBtn" text="cancel" onClick={closeModal} />
      <Btn type="primaryBtn" text="save" onClick={submitProject} />
    </div>
  );
};

export default Controls;
