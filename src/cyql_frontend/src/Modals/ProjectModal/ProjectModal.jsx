import React, { useState } from "react";
import css from "./ProjectModal.module.css";

// icons
import CrossIcon from "../../Icons/CrossIcon/CrossIcon";

// firestore
import { doc, addDoc, setDoc, deleteDoc } from "firebase/firestore";
import { projectsCollRef } from "../../Firestore/firestore-collections";

// inputs
import { main, socials, additional, nft, nftSaleStatusOptions } from "./inputs";

// components
import { Input, Select, TextArea } from "./index";

// state
import { useSelector, useDispatch } from "react-redux";
import {
  selectProjectModal,
  selectProject,
  setProject,
  selectMode,
  setCloseProjectModal,
} from "../../State/modals/projectModal";
import { selectCategories } from "../../State/categories";

const ModalProjectEdit = () => {
  const dispatch = useDispatch();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const projectModal = useSelector(selectProjectModal);
  const project = useSelector(selectProject);
  const mode = useSelector(selectMode);
  const categories = useSelector(selectCategories);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setProject({ [name]: value }));
  };

  const submitProject = async () => {
    const timestamp = Date.now();
    try {
      if (mode === "add") {
        await addDoc(projectsCollRef, { ...project, added: timestamp });
      } else if (mode === "edit") {
        await setDoc(doc(projectsCollRef, project.idx), { ...project, edited: timestamp });
      }
    } catch (err) {
      console.log(err.message);
    }
    closeModal();
  };

  const closeModal = () => {
    dispatch(setCloseProjectModal());
  };

  const deleteProject = async () => {
    try {
      await deleteDoc(doc(projectsCollRef, project.idx));
    } catch (err) {
      console.log(err.message);
    }
    closeModal();
  };

  // add has token

  return (
    <div className={css.modal}>
      <div className={css.content}>
        <div className={css.modalTitle}>
          <h4>Edit Project</h4>
          <span className={css.icon} onClick={closeModal}>
            <CrossIcon />
          </span>
        </div>

        <div className={css.form}>
          <div className={css.formContent}>
            <div className={css.section}>
              <h5 className={css.sectionTitle}>Main</h5>
              {/* id */}
              <Select
                id="category"
                label="Category"
                value={project.category}
                onChange={handleChange}
                selectOptions={categories}
              />

              {main.map((input) => (
                <Input
                  id={input.id}
                  label={input.label}
                  type={input.type}
                  value={project[input.id]}
                  onChange={handleChange}
                  key={input.id}
                />
              ))}

              <TextArea
                id="description"
                label="Description"
                value={project.description}
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
                    value={project[input.id]}
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
                    value={project[input.id]}
                    onChange={handleChange}
                    key={input.id}
                  />
                ))}
              </div>
            </div>

            {project.category === "NFTs" || project.category === "nfts" ? (
              <div className={css.section}>
                <h5 className={css.sectionTitle}>NFT collection data</h5>
                <Select
                  id="nftSaleStatus"
                  label="NFT sale status"
                  value={project.nftSaleStatus}
                  onChange={handleChange}
                  selectOptions={nftSaleStatusOptions}
                />

                {nft.map((input) => (
                  <Input
                    id={input.id}
                    label={input.label}
                    type={input.type}
                    value={project[input.id]}
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
            <button className="primaryBtn" onClick={submitProject}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProjectEdit;
