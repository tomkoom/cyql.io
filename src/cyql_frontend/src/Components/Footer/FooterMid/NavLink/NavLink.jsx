import React from "react";
import css from "./NavLink.module.css";

const NavLink = ({ label, to }) => {
  const navigate = () => {
    to();
  };

  return (
    <div className={css.navlink} onClick={navigate}>
      <p className={css.label}>{label}</p>
    </div>
  );
};

export default NavLink;
