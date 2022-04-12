import React from "react";
import css from "./FooterMid.module.css";
import Logo from "../../Logo/Logo";

// icons
import { iTwitter, iDiscord } from "../../../Icons/Icons";

// routes
import { toHome, toApps, toUpcoming, toSubmit } from "../../../Routes/routes";

const socLinks = [
  { id: "twitter", link: "https://twitter.com/DfinityApps", icon: iTwitter },
  { id: "discord", link: "https://discord.gg/AnjyrfvvXX", icon: iDiscord },
];

const navlinks = [
  { name: "Home", link: toHome },
  { name: "All Projects", link: toApps },
  { name: "Upcoming NFT Sales", link: toUpcoming },
  { name: "Submit Your Project", link: toSubmit },
];

const FooterMid = () => {
  return (
    <div className={css.footerMid}>
      {/* logo */}
      <div className={css.footerMid__i}>
        <div className={css.footerMid__i__logo}>
          <Logo />
          <p>
            IC projects <br /> community portal
          </p>
        </div>
      </div>

      {/* nav list */}
      <div className={css.footerMid__i}>
        <ul className={css.footerMid__i__navList}>
          {navlinks.map(({ name, link }, i) => (
            <li key={i}>
              <button
                className={`${css.footerMid__i__navList__i} navlink`}
                onClick={() => link()}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* soc Links */}
      <div className={css.footerMid__i}>
        <ul className={css.footerMid__i__socLinks}>
          {socLinks.map(({ id, link, icon }) => (
            <li className={css.footerMid__i__socLinks__i} key={id}>
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
