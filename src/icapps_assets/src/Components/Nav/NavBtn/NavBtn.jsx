import React from "react";
import css from "./NavBtn.module.css";

// state
import { useDispatch, useSelector } from "react-redux";
import { setMobileMenuModal, selectMobileMenuModal } from "../../../State/modals";

const NavBtn = ({ btnName, navTo, icon }) => {
  const dispatch = useDispatch();
  const mobileMenuModal = useSelector(selectMobileMenuModal);

  return (
    <button
      className="navlink"
      onClick={() => {
        navTo();
        mobileMenuModal && dispatch(setMobileMenuModal(false));
      }}
    >
      {icon && <span className={css.icon}>{icon}</span>} {btnName}
    </button>
  );
};

export default NavBtn;
