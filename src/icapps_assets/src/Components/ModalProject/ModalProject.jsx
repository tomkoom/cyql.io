import React from "react";
import css from "./ModalProject.module.css";

// icons
import { iTimes } from "../../Icons/Icons";

// firestore
import { projectsColRef } from "../../../../../firebase/firestore-collections";
import { doc, setDoc } from "firebase/firestore";

// state
import { useSelector, useDispatch } from "react-redux";
import {
  selectProjectModal,
  setProjectModal,
  selectProject,
  setEditProject,
} from "../../State/projectModal";

const ModalProjectEdit = () => {
  const dispatch = useDispatch();
  const projectModal = useSelector(selectProjectModal);
  const project = useSelector(selectProject);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(projectsColRef, project.idx), { ...project });
    } catch (err) {
      console.log(err.message);
    }
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
          <span onClick={() => dispatch(setProjectModal(false))}>{iTimes}</span>
        </div>

        <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.formContent}>
            <div className={css.section}>
              <h5>Main</h5>

              <div className={css.formField}>
                <label htmlFor="name">Name</label>
                <input
                  value={project.name}
                  onChange={(e) => dispatch(setEditProject({ [e.target.name]: e.target.value }))}
                  type="text"
                  id="name"
                  name="name"
                />
              </div>

              <div className={css.formField}>
                <label htmlFor="id">Id</label>
                <input
                  value={project.name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()}
                  type="text"
                  id="id"
                  name="id"
                  disabled
                />
              </div>

              <div className={css.formField}>
                <label htmlFor="category">Category</label>
                <select
                  onChange={(e) => dispatch(setEditProject({ [e.target.name]: e.target.value }))}
                  id="category"
                  name="category"
                >
                  <option value="">Choose category</option>
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
                  onChange={(e) => dispatch(setEditProject({ [e.target.name]: e.target.value }))}
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
                    onChange={(e) => dispatch(setEditProject({ [e.target.name]: e.target.value }))}
                    type="text"
                    id={input.id}
                    name={input.id}
                  />
                </div>
              ))}
            </div>

            <div className={css.section}>
              <h5>Social networks</h5>
              {inputsSocial.map((input) => (
                <div className={css.formField} key={input.id}>
                  <label htmlFor={input.id}>{input.label}</label>
                  <input
                    value={project[input.id]}
                    onChange={(e) => dispatch(setEditProject({ [e.target.name]: e.target.value }))}
                    type="text"
                    id={input.id}
                    name={input.id}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={css.controls}>
            <button className="primaryBtn" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalProjectEdit;
