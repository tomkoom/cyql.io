import React, { useState } from "react";
import css from "./Controls.module.css";

// juno
import { getDoc, setDoc, delDoc } from "@junobuild/core";

// state
import { useSelector, useDispatch } from "react-redux";
import {
  selectProjectDoc,
  selectMode,
  setCloseProjectModal,
} from "@state/modals/projectModal/projectModal";
import {
  setProjectModalLoadingAdd,
  setProjectModalLoadingEdit,
  setProjectModalLoadingDel,
} from "@state/modals/projectModal/projectModalLoading";

// project id
import { nanoid } from "@utils/projectId";

const Controls = () => {
  // hooks
  const dispatch = useDispatch();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // state
  const mode = useSelector(selectMode);
  const projectDoc = useSelector(selectProjectDoc);

  // juno
  const collection = "projects";

  const submitProject = async () => {
    const timestamp = Date.now();
    const projectId = nanoid();

    const doc = await getDoc({ collection, key: projectDoc.key });

    await setDoc({
      collection,
      doc: {
        key: projectDoc.key,
        data: {
          ...projectDoc.data,
        },
      },
    });

    if (mode === "add") {
      dispatch(setProjectModalLoadingAdd(true));
      const docAdd = {
        key: projectId,
        data: {
          ...projectDoc.data,
          __id__: projectId,
          added: timestamp,
        },
      };
      await setDoc({
        collection,
        doc: docAdd,
      })
        .then(() => console.log("Project added with the id ", projectId))
        .catch((e) => console.log(e));
      dispatch(setProjectModalLoadingAdd(false));

      // edit
      // fix keys / ids. setdoc by key, not id
    } else if (mode === "edit") {
      dispatch(setProjectModalLoadingEdit(true));
      const docEdit = {
        key: projectDoc.key,
        updated_at: timestamp,
        data: {
          ...projectDoc.data,
          edited: timestamp,
        },
      };
      await setDoc({
        collection,
        doc: docEdit,
      })
        .then(() => console.log("Project edited with the id ", projectDoc.key))
        .catch((e) => console.log(e));
      dispatch(setProjectModalLoadingEdit(false));
    }
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
