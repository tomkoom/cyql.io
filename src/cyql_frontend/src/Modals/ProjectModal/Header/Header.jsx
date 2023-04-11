import React from "react";
import css from "./Header.module.css";

// icons
import CrossIcon from "@icons/CrossIcon/CrossIcon";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectProject, setCloseProjectModal } from "@state/modals/projectModal/projectModal";

const Header = () => {
  const dispatch = useDispatch();
  const project = useSelector(selectProject);
  const closeModal = () => {
    dispatch(setCloseProjectModal());
  };

  return (
    <div className={css.header}>
      <div className={css.headerI}>
        <h4 className={css.title}>Edit {project.name}</h4>
        {project.id && <p className={css.id}>{project.id}</p>}
      </div>

      <span className={css.icon} onClick={closeModal}>
        <CrossIcon />
      </span>
    </div>
  );
};

export default Header;
