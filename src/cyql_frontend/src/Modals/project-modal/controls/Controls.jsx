import React, { useState } from "react";
import css from "./Controls.module.css";

import { junoDatastoreCollection } from "@constants/constants";

// juno
import { getDoc, setDoc, delDoc } from "@junobuild/core";

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
  const projectDoc = useSelector(selectProjectDoc);
  const collection = junoDatastoreCollection;

  const submitProject = async () => {
    const timestamp = Date.now();

    // check if doc exists
    const doc = await getDoc({ collection, key: projectDoc.key });
    const key = doc === undefined ? nanoid() : projectDoc.key;

    dispatch(setProjectModalLoadingSet(true));
    await setDoc({
      collection,
      doc: {
        key,
        data: {
          ...projectDoc.data,
          ...(doc === undefined ? { added: timestamp } : { edited: timestamp }),
        },
        ...(doc !== undefined && { updated_at: doc.updated_at }),
      },
    })
      .then(() => console.log("Doc set with the id", key))
      .catch((e) => console.log(e));
    dispatch(setProjectModalLoadingSet(false));
    closeModal();
    // reload page (?)
  };

  const deleteProject = async () => {
    dispatch(setProjectModalLoadingDel(true));
    const doc = await getDoc({
      collection,
      key: projectDoc.key,
    });
    await delDoc({ collection, doc }).catch((e) => console.log(e));
    console.log(`doc with the id ${projectDoc.key} deleted`);

    dispatch(setProjectModalLoadingDel(false));
    closeModal();
    // reload page (?)
  };

  const closeModal = () => {
    dispatch(setCloseProjectModal());
  };

  return (
    <div className={css.controls}>
      <p>reload page after project is added</p>
      {!deleteConfirm ? (
        <button id={css.alertBtn} className="alertBtn" onClick={() => setDeleteConfirm(true)}>
          delete
        </button>
      ) : (
        <div className={css.deleteContainer}>
          <button className="secondaryBtn" onClick={() => setDeleteConfirm(false)}>
            cancel
          </button>
          <button id={css.alertBtn} className="alertBtn" onClick={deleteProject}>
            confirm
          </button>
        </div>
      )}

      <button className="secondaryBtn" onClick={closeModal}>
        cancel
      </button>
      <button className="primaryBtn" onClick={submitProject}>
        save
      </button>
    </div>
  );
};

export default Controls;
