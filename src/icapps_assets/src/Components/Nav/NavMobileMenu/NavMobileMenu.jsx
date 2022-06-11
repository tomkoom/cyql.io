import React from "react";
import css from "./NavMobileMenu.module.css";

// icons
import { iTwitter, iDiscord, iTimes } from "../../../Icons/Icons";

// state
import { useDispatch } from "react-redux";
import { setMobileMenuModal } from "../../../State/modals";

// components
import { NavLinks } from "../../index";

const NavMobile = () => {
  const dispatch = useDispatch();

  return (
    <div className={css.navMenuMobile} onClick={() => dispatch(setMobileMenuModal(false))}>
      <div className={css.content} onClick={(e) => e.stopPropagation()}>
        <div className={css.linksContainer}>
          <NavLinks type="navMobile" />

          <div className={css.socIcons}>
            <a
              className={css.socIconsI}
              id={css.twitter}
              href="https://twitter.com/DfinityApps"
              rel="noreferrer noopener"
              target="_blank"
            >
              {iTwitter}
            </a>
            <a
              className={css.socIconsI}
              id={css.discord}
              href="https://discord.gg/AnjyrfvvXX"
              rel="noreferrer noopener"
              target="_blank"
            >
              {iDiscord}
            </a>
          </div>
        </div>

        <button className={css.menuBtn} onClick={() => dispatch(setMobileMenuModal(false))}>
          {iTimes}
        </button>
      </div>
    </div>
  );
};

export default NavMobile;
