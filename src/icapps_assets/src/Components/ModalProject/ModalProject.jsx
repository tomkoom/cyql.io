import React from "react";
import css from "./ModalProject.module.css";

// icons
import { iTimes } from "../../Icons/Icons";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(project);
    dispatch(setProjectModal(false));
  };

  const socialNetworks = [
    { id: "twitter", type: "Text", label: "Twitter" },
    { id: "discord", type: "Text", label: "Discord" },
    { id: "telegram", type: "Text", label: "Telegram" },
    { id: "github", type: "Text", label: "GitHub" },
    { id: "medium", type: "Text", label: "Medium" },
    { id: "dscvr", type: "Text", label: "Dscvr" },
    { id: "distrikt", type: "Text", label: "Distrikt" },
    { id: "openChat", type: "Text", label: "OpenChat" },
  ];

  return (
    <div
      className={projectModal ? `${css.modal} ${css.active}` : css.modal}
      // onClick={() => dispatch(setProjectModal(false))}
    >
      <div
        className={projectModal ? `${css.content} ${css.active}` : css.content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={css.modalTitle}>
          <h4>Edit Project</h4>
          <span onClick={() => dispatch(setProjectModal(false))}>{iTimes}</span>
        </div>

        <form className={css.form} onSubmit={handleSubmit}>
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
              <label htmlFor="description">Description</label>
              <textarea
                value={project.description}
                onChange={(e) => dispatch(setEditProject({ [e.target.name]: e.target.value }))}
                id="description"
                name="description"
                rows="4"
              />
            </div>

            <div className={css.formField}>
              <label htmlFor="website">Website</label>
              <input
                value={project.website}
                onChange={(e) => dispatch(setEditProject({ [e.target.name]: e.target.value }))}
                type="text"
                id="website"
                name="website"
              />
            </div>

            <div className={css.formField}>
              <label htmlFor="canister">Canister</label>
              <input
                value={project.canister}
                onChange={(e) => dispatch(setEditProject({ [e.target.name]: e.target.value }))}
                type="text"
                id="canister"
                name="canister"
              />
            </div>
          </div>

          <div className={css.section}>
            <h5>Social networks</h5>
            {socialNetworks.map((sn) => (
              <div className={css.formField} key={sn.id}>
                <label htmlFor={sn.id}>{sn.label}</label>
                <input
                  value={project[sn.id]}
                  onChange={(e) => dispatch(setEditProject({ [e.target.name]: e.target.value }))}
                  type={sn.type}
                  id={sn.id}
                  name={sn.id}
                />
              </div>
            ))}
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
