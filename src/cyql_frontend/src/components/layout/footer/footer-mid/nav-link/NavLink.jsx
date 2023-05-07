import React from "react";
import css from "./NavLink.module.css";

const NavLink = ({ label, to }) => {
  const navigate = () => {
    to();
  };

  return (
    <span className={css.navlink} onClick={navigate}>
      {label}
    </span>
  );
};

export default NavLink;
