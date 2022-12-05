import React, { useState, useEffect } from "react";
import css from "./ProjectModal.module.css";

// firestore
import { doc, addDoc, setDoc, deleteDoc } from "firebase/firestore";
import { pColRef } from "@firestore/firestore-collections";

// inputs
import { main, socials, additional, nft, nftSaleStatusOptions } from "./inputs";

// components
import { Header, Input, Select, TextArea } from "./index";

// state
import { useSelector, useDispatch } from "react-redux";
import {
  selectProject,
  setProject,
  selectMode,
  setCloseProjectModal,
} from "@state/modals/projectModal";
import { selectCategories } from "@state/modals/categories";

const ProjectModal = () => {
  const dispatch = useDispatch();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const p = useSelector(selectProject);
  const mode = useSelector(selectMode);
  const categories = useSelector(selectCategories);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setProject({ [name]: value }));
  };

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
          <div className={css.formContent}>
            <div className={css.section}>
              <h5 className={css.sectionTitle}>Main</h5>
              <Select
                id="category"
                label="Category"
                value={p.category[0]}
                // fix category
                onChange={handleChange}
                selectOptions={categories}
              />

              {main.map((input) => (
                <Input
                  id={input.id}
                  label={input.label}
                  type={input.type}
                  value={p[input.id]}
                  onChange={handleChange}
                  key={input.id}
                />
              ))}

              <TextArea
                id="description"
                label="Description"
                value={p.description}
                onChange={handleChange}
              />
            </div>

            <div>
              <div className={css.section}>
                <h5 className={css.sectionTitle}>Social networks</h5>
                {socials.map((input) => (
                  <Input
                    id={input.id}
                    label={input.label}
                    type={input.type}
                    value={p[input.id]}
                    onChange={handleChange}
                    key={input.id}
                  />
                ))}
              </div>

              <div className={css.section}>
                <h5 className={css.sectionTitle}>Additional info</h5>
                {additional.map((input) => (
                  <Input
                    id={input.id}
                    label={input.label}
                    type={input.type}
                    value={p[input.id]}
                    onChange={handleChange}
                    key={input.id}
                  />
                ))}
              </div>
            </div>

            {p.category.includes("NFTs") ? (
              <div className={css.section}>
                <h5 className={css.sectionTitle}>NFT data</h5>
                <Select
                  id="nftSaleStatus"
                  label="NFT sale status"
                  value={p.nftSaleStatus}
                  onChange={handleChange}
                  selectOptions={nftSaleStatusOptions}
                />

                {nft.map((input) => (
                  <Input
                    id={input.id}
                    label={input.label}
                    type={input.type}
                    value={p[input.id]}
                    onChange={handleChange}
                    key={input.id}
                  />
                ))}
              </div>
            ) : (
              ""
            )}
          </div>

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
