import React from "react";
import css from "./FooterMid.module.css";
import ICLogo from "../../../../assets/ic-logo.svg";

// routes
import { toHome, toApps, toUpcoming, toSubmit, toNft, toJobs } from "@routes/routes";

// components
import Logo from "@components/Logo/Logo";
import { Meta, NavLink, Socials } from "./index";

const FooterMid = () => {
  return (
    <div className={css.footerMid}>
      <div className={css.logo} onClick={toHome}>
        <Logo />
      </div>

      <div className={css.nav}>
        <NavLink label="Projects" to={toApps} />
        <NavLink label="Upcoming NFTs" to={toUpcoming} />
        <NavLink label="Jobs" to={toJobs} />
        <NavLink label="Submit" to={toSubmit} />
        <NavLink label="cyql NFT" to={toNft} />
      </div>
      <Meta />
      <Socials />
    </div>
  );
};

export default FooterMid;
