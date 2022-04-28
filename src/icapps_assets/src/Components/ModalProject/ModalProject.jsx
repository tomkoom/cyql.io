import React from "react";
import css from "./ModalProject.module.css";

// state
import { useSelector, useDispatch } from "react-redux";
import {
  selectProjectModal,
  setProjectModal,
  selectProjectInfo,
  setEditProjectInfo,
} from "../../State/projectModal";

const ModalProjectEdit = () => {
  const dispatch = useDispatch();
  const projectModal = useSelector(selectProjectModal);
  const project = useSelector(selectProjectInfo);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(project);
    dispatch(setProjectModal(false));
  };

  return (
    <div
      className={projectModal ? `${css.modal} ${css.active}` : css.modal}
      onClick={() => dispatch(setProjectModal(false))}
    >
      <div
        className={projectModal ? `${css.content} ${css.active}` : css.content}
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className={css.modalTitle}>Edit Project</h4>
        <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.formField}>
            <label htmlFor="name">Name</label>
            <input
              value={project.name}
              onChange={(e) => dispatch(setEditProjectInfo({ [e.target.name]: e.target.value }))}
              type="text"
              id="name"
              name="name"
            />
          </div>

          <div className={css.formField}>
            <label htmlFor="website">Website</label>
            <input
              value={project.website}
              onChange={(e) => dispatch(setEditProjectInfo({ [e.target.name]: e.target.value }))}
              type="text"
              id="website"
              name="website"
            />
          </div>

          <div className={css.formField}>
            <label htmlFor="canister">Canister</label>
            <input
              value={project.canister}
              onChange={(e) => dispatch(setEditProjectInfo({ [e.target.name]: e.target.value }))}
              type="text"
              id="canister"
              name="canister"
            />
          </div>

          <div className={css.formField}>
            <label htmlFor="discord">Discord</label>
            <input
              value={project.discord}
              onChange={(e) => dispatch(setEditProjectInfo({ [e.target.name]: e.target.value }))}
              type="text"
              id="discord"
              name="discord"
            />
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
