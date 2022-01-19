import React, { useEffect } from "react";
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
  // useEffect(() => {
  //   if (menuIsOpen) {
  //     document.body.style.overflow = "hidden";
  //     console.log(menuIsOpen);
  //   } else {
  //     document.body.style.overflow = "auto";
  //     console.log(menuIsOpen);
  //   }
  // }, [menuIsOpen]);

  return (
    <div
      className={css.navMenuMobile}
      onClick={() => {
        setMenuIsOpen(false);
      }}
    >
      <div
        className={css.navMenuMobile__content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={css.navMenuMobile__content__navlist}>
          <ul>
            {navLinks.map(({ name, link }, i) => (
              <li
                onClick={() => {
                  link();
                  setMenuIsOpen(false);
                }}
                key={i}
              >
                <p className={css.navLink__title}>{name}</p>
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

        <button className={css.menuBtn} onClick={() => setMenuIsOpen(false)}>
          {iconTimes}
        </button>
      </div>
    </div>
  );
};

export default NavMenuMobile;
