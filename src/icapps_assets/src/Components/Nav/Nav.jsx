import React from "react";
import css from "./Nav.module.css";

// components
import { NavTop, NavMid, NavBot } from "./index";

const Nav = () => {
  return (
    <nav className={css.nav}>
      <NavTop />
      <div className={css.divider} />
      <NavMid />
      <div className={css.divider} />
    </nav>
  );
};

export default Nav;
