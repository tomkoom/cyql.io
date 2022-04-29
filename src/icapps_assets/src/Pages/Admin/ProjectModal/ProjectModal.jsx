import React from "react";
import css from "./ProjectModal.module.css";

// icons
import { iTimes } from "../../../Icons/Icons";

// firestore
import { projectsColRef } from "../../../../../../firebase/firestore-collections";
import { doc, addDoc, setDoc } from "firebase/firestore";

// state
import { useSelector, useDispatch } from "react-redux";
import {
  selectProjectModal,
  setProjectModal,
  selectProject,
  setProject,
  setClearProject,
  selectMode,
  setMode,
} from "../../../State/projectModal";

const ModalProjectEdit = () => {
  const dispatch = useDispatch();
  const projectModal = useSelector(selectProjectModal);
  const project = useSelector(selectProject);
  const mode = useSelector(selectMode);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setProject({ [name]: value }));
  };

  const handleSubmit = async () => {
    const timestamp = Date.now();
    try {
      if (mode === "add") {
        await addDoc(projectsColRef, { ...project, added: timestamp });
      } else if (mode === "edit") {
        await setDoc(doc(projectsColRef, project.idx), { ...project, edited: timestamp });
      }
    } catch (err) {
      console.log(err.message);
    }
    closeModal();
  };

  const closeModal = () => {
    dispatch(setMode(""));
    dispatch(setClearProject());
    dispatch(setProjectModal(false));
  };

  const inputsMain = [
    { id: "website", label: "Website" },
    { id: "canister", label: "Canister" },
    { id: "logo", label: "Logo" },
    { id: "cover", label: "Cover" },
  ];

  const inputsSocial = [
    { id: "twitter", label: "Twitter" },
    { id: "discord", label: "Discord" },
    { id: "telegram", label: "Telegram" },
    { id: "github", label: "GitHub" },
    { id: "medium", label: "Medium" },
    { id: "dscvr", label: "Dscvr" },
    { id: "distrikt", label: "Distrikt" },
    { id: "openChat", label: "OpenChat" },
  ];

  return (
    <div className={projectModal ? `${css.modal} ${css.active}` : css.modal}>
      <div className={projectModal ? `${css.content} ${css.active}` : css.content}>
        <div className={css.modalTitle}>
          <h4>Edit Project</h4>
          <span onClick={closeModal}>{iTimes}</span>
        </div>

        <div className={css.form}>
          <div className={css.formContent}>
            <div className={css.section}>
              <h5>Main</h5>

              <div className={css.formField}>
                <label htmlFor="name">Name</label>
                <input
                  value={project.name}
                  onChange={handleChange}
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="off"
                />
              </div>

              <div className={css.formField}>
                <label htmlFor="id">Slug</label>
                <input
                  value={project.id}
                  onChange={handleChange}
                  type="text"
                  id="id"
                  name="id"
                  autoComplete="off"
                />
              </div>

              <div className={css.formField}>
                <label htmlFor="category">Category</label>
                <select
                  value={project.category}
                  onChange={handleChange}
                  id="category"
                  name="category"
                >
                  {!project.category && <option value="">Choose category</option>}
                  <option value="Communities">Communities</option>
                  <option value="DAOs">DAOs</option>
                  <option value="dApps">dApps</option>
                  <option value="DeFi">DeFi</option>
                  <option value="Education">Education</option>
                  <option value="Explorers">Explorers</option>
                  <option value="Games">Games</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Metaverse">Metaverse</option>
                  <option value="NFTs">NFTs</option>
                  <option value="Social Networks">Social Networks</option>
                  <option value="Tools">Tools</option>
                  <option value="Wallets">Wallets</option>
                </select>
              </div>

              <div className={css.formField}>
                <label htmlFor="description">Description</label>
                <textarea
                  value={project.description}
                  onChange={handleChange}
                  id="description"
                  name="description"
                  rows="6"
                />
              </div>

              {inputsMain.map((input) => (
                <div className={css.formField} key={input.id}>
                  <label htmlFor={input.id}>{input.label}</label>
                  <input
                    value={project[input.id]}
                    onChange={handleChange}
                    type="text"
                    id={input.id}
                    name={input.id}
                    autoComplete="off"
                  />
                </div>
              ))}
            </div>

            <div className={css.section}>
              <h5>Social Networks</h5>
              {inputsSocial.map((input) => (
                <div className={css.formField} key={input.id}>
                  <label htmlFor={input.id}>{input.label}</label>
                  <input
                    value={project[input.id]}
                    onChange={handleChange}
                    type="text"
                    id={input.id}
                    name={input.id}
                    autoComplete="off"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={css.controls}>
            <button id={css.alertBtn} className="alertBtn" onClick={closeModal}>
              Delete
            </button>
            <button className="secondaryBtn" onClick={closeModal}>
              Cancel
            </button>
            <button className="primaryBtn" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProjectEdit;
