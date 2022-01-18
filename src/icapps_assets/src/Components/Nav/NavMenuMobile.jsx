import React from "react";
import css from "./NavMenuMobile.module.css";
import { navLinks } from "../../NavLinks/navLinks";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const iconTimes = <FontAwesomeIcon icon={faTimes} />;
const iconTwitter = <FontAwesomeIcon icon={faTwitter} />;
const iconDiscord = <FontAwesomeIcon icon={faDiscord} />;

const NavMenuMobile = ({ menuIsOpen, setMenuIsOpen }) => {
  return (
    <div className={css.navMenuMobile}>
      <div>
        <ul>
          {navLinks.map(({ name, description, link }, i) => (
            <li
              onClick={() => {
                link();
                setMenuIsOpen(false);
              }}
              key={i}
            >
              <p className={css.navLink__title}>{name}</p>
              <p className={css.navLink__subtitle}>{description}</p>
            </li>
          ))}
        </ul>
        <div className={css.socIcons}>
          <a
            className={css.socIcons__item}
            id={css.twitter}
            href="https://twitter.com/DfinityApps"
            rel="noreferrer noopener"
            target="_blank"
          >
            {iconTwitter}
          </a>
          <a
            className={css.socIcons__item}
            id={css.discord}
            href="https://discord.gg/AnjyrfvvXX"
            rel="noreferrer noopener"
            target="_blank"
          >
            {iconDiscord}
          </a>
        </div>
      </div>

      <button className="navlink" onClick={() => setMenuIsOpen(!menuIsOpen)}>
        {iconTimes}
      </button>
    </div>
  );
};

export default NavMenuMobile;
