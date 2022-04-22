import React, { useEffect } from "react";
import css from "./NavMenuMobile.module.css";
import { navLinks } from "../../Routes/navLinks";

// icons
import { iTwitter, iDiscord, iTimes } from "../../Icons/Icons";

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
      <div className={css.navMenuMobile__content} onClick={(e) => e.stopPropagation()}>
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
              {iTwitter}
            </a>
            <a
              className={css.socIcons__item}
              id={css.discord}
              href="https://discord.gg/AnjyrfvvXX"
              rel="noreferrer noopener"
              target="_blank"
            >
              {iDiscord}
            </a>
          </div>
        </div>

        <button className={css.menuBtn} onClick={() => setMenuIsOpen(false)}>
          {iTimes}
        </button>
      </div>
    </div>
  );
};

export default NavMenuMobile;
