import React from "react";
import css from "./FooterMid.module.css";
import Logo from "../../Logo/Logo";

// icons
import { iTwitter, iDiscord, iMediumM } from "../../../Icons/Icons";

// routes
import { toHome, toApps, toUpcoming, toSubmit, toNft, toJobs } from "../../../Routes/routes";

// components
import NavLink from "./NavLink/NavLink";

const socials = [
  { id: "twitter", link: "https://twitter.com/DfinityApps", icon: iTwitter },
  { id: "discord", link: "https://discord.gg/AnjyrfvvXX", icon: iDiscord },
  { id: "medium", link: "https://medium.com/@cyql", icon: iMediumM },
];

const FooterMid = () => {
  return (
    <div className={css.footerMid}>
      <div className={css.logo} onClick={toHome}>
        <Logo />
      </div>

      <div className={css.nav}>
        <NavLink label="Projects" to={toApps} />
        <NavLink label="Upcoming NFTs" to={toUpcoming} />
        <NavLink label="cyql NFT" to={toNft} />
        <NavLink label="Jobs" to={toJobs} />
        <NavLink label="Submit" to={toSubmit} />
      </div>

      <ul className={css.socials}>
        {socials.map(({ id, link, icon }) => (
          <li className={css.socialsI} key={id}>
            <a href={link} id={id} rel="noreferrer noopener" target="_blank">
              {icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterMid;
