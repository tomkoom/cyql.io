import React from "react";
import css from "./NavLink.module.css";

// state
import { useDispatch, useSelector } from "react-redux";
import { setMobileMenuModal, selectMobileMenuModal } from "../../../../../State/modals";

const NavLink = ({ label, to, icon }) => {
  const dispatch = useDispatch();
  const isMobileModalActive = useSelector(selectMobileMenuModal);

  const navigate = () => {
    to();
    if (isMobileModalActive) {
      dispatch(setMobileMenuModal(false));
    }
  };

  return (
    <div className={css.navlink} onClick={navigate}>
      {icon && <span className={css.icon}>{icon}</span>} {label}
    </div>
  );
};

export default NavLink;
