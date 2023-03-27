import React from "react";
import css from "./Navlink.module.css";

// state
import { useDispatch } from "react-redux";
import { setMobileMenuModal } from "@state/modals/modals";

const Navlink = ({ label, to, icon }) => {
  const dispatch = useDispatch();
  const navigate = () => {
    to();
    dispatch(setMobileMenuModal(false));
  };

  return (
    <div className={css.navlink} onClick={navigate}>
      {icon && <span className={css.icon}>{icon}</span>}
      <p className={css.label}>{label}</p>
    </div>
  );
};

export default Navlink;
