import React from "react";
import css from "./FooterMid.module.css";

// hooks
import useNav from "@/hooks/useNav";

// components
import { Logo } from "@/components/ui/_index";
import { Meta, NavLink, Socials } from "./_index";

const FooterMid = () => {
  const { toHome, toProjects, toSubmit } = useNav();

  return (
    <div className={css.footerMid}>
      <div className={css.logo} onClick={toHome}>
        <Logo />
      </div>

      <div className={css.nav}>
        <NavLink label="projects" to={toProjects} />
        <NavLink label="submit" to={toSubmit} />
      </div>
      <Socials />
      <Meta />
    </div>
  );
};

export default FooterMid;
