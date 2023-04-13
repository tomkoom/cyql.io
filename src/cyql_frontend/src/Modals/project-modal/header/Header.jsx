import React from "react";
import css from "./Header.module.css";

// icons
import CrossIcon from "@icons/CrossIcon/CrossIcon";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectProjectDoc, setCloseProjectModal } from "@state/modals/projectModal/projectModal";

const Header = () => {
  const dispatch = useDispatch();
  const projectDoc = useSelector(selectProjectDoc);
  const closeModal = () => {
    dispatch(setCloseProjectModal());
  };

  return (
    <div className={css.header}>
      <div className={css.headerI}>
        <h4 className={css.title}>Edit {projectDoc.data.name}</h4>
        {projectDoc.key && <p className={css.id}>{projectDoc.key}</p>}
      </div>

      <span className={css.icon} onClick={closeModal}>
        <CrossIcon />
      </span>
    </div>
  );
};

export default Header;
