import React from "react";
import css from "./NavLink.module.css";

// state
import { useDispatch, useSelector } from "react-redux";
import { setMobileMenuModal, selectMobileMenuModal } from "../../../State/modals";

const NavLink = ({ label, navTo, icon }) => {
  const dispatch = useDispatch();
  const mobileMenuModal = useSelector(selectMobileMenuModal);

  return (
    <div
      className={css.navlink}
      onClick={() => {
        navTo();
        mobileMenuModal && dispatch(setMobileMenuModal(false));
      }}
    >
      {icon && <span className={css.icon}>{icon}</span>} {label}
    </div>
  );
};

export default NavLink;
