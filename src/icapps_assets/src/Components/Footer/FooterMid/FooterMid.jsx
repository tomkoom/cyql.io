import React from "react";
import css from "./FooterMid.module.css";
import Logo from "../../Logo/Logo";

// icons
import { iTwitter, iDiscord } from "../../../Icons/Icons";

// routes
import { toHome } from "../../../Routes/routes";

// components
import { NavLinks } from "../../index";

const socLinks = [
  { id: "twitter", link: "https://twitter.com/DfinityApps", icon: iTwitter },
  { id: "discord", link: "https://discord.gg/AnjyrfvvXX", icon: iDiscord },
];

const FooterMid = () => {
  return (
    <div className={css.footerMid}>
      {/* logo */}
      <div className={css.footerMidI}>
        <div className={css.logo} onClick={toHome}>
          <Logo />
        </div>
      </div>

      {/* navlinks */}
      <NavLinks type="footer" />

      {/* soclinks */}
      <div className={css.footerMidI}>
        <ul className={css.soclinks}>
          {socLinks.map(({ id, link, icon }) => (
            <li className={css.soclinksI} key={id}>
              <a href={link} id={id} rel="noreferrer noopener" target="_blank">
                {icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterMid;
