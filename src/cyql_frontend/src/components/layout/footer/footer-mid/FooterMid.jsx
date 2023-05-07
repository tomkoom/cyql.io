import React from "react";
import css from "./FooterMid.module.css";

// routes
import { toHome, toApps, toSubmit } from "@routes/routes";

// components
import { Logo } from "@ui-elements/index";
import { Meta, NavLink, Socials } from "./index";

const FooterMid = () => {
  return (
    <div className={css.footerMid}>
      <div className={css.logo} onClick={toHome}>
        <Logo />
      </div>

      <div className={css.nav}>
        <NavLink label="projects" to={toApps} />
        <NavLink label="submit" to={toSubmit} />
      </div>
      <Socials />
      <Meta />
    </div>
  );
};

export default FooterMid;
