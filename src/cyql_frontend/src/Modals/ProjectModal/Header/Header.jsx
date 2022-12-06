import React from "react";
import css from "./Header.module.css";

// icons
import CrossIcon from "@icons/CrossIcon/CrossIcon";

// state
import { useDispatch } from "react-redux";
import { setCloseProjectModal } from "@state/modals/projectModal";

const Header = ({ name, id }) => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setCloseProjectModal());
  };

  return (
    <div className={css.header}>
      <div className={css.headerI}>
        <h4 className={css.title}>Edit {name}</h4>
        {id && <p className={css.id}>{id}</p>}
      </div>

      <span className={css.icon} onClick={closeModal}>
        <CrossIcon />
      </span>
    </div>
  );
};

export default Header;
