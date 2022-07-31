import React from "react";
import css from "./NavLink.module.css";

// history
import { history } from "../../../Routes/history";

const NavLink = ({ label, to, icon }) => {
  const navigate = () => {
    to();
  };

  return (
    <div
      className={css.navlink}
      // className={
      //   history.location.pathname === `/${label.split(/ (.*)/)[0].toLowerCase()}`
      //     ? `${css.navlink} ${css.active}`
      //     : css.navlink
      // }
      onClick={navigate}
    >
      {icon && <span className={css.icon}>{icon}</span>}
      <p className={css.label}>{label}</p>
    </div>
  );
};

export default NavLink;
