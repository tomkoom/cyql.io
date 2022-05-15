import React from "react";
import css from "./NavMobileMenu.module.css";
import k from "../../../../../../k/k";

// icons
import { iTwitter, iDiscord, iTimes, iFire } from "../../../Icons/Icons";

// state
import { useDispatch } from "react-redux";
import { setMobileMenuModal } from "../../../State/modals";

// components
import NavBtn from "../NavBtn/NavBtn";
import SignInBtn from "../SignInBtn/SignInBtn";

// navlinks
import { toAdmin, toProfile, toSubmit, toUpcoming, toApps } from "../../../Routes/routes";

// auth
import { useAuth } from "../../../Context/AuthContext";

const NavMobile = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <div className={css.navMenuMobile} onClick={() => dispatch(setMobileMenuModal(false))}>
      <div className={css.content} onClick={(e) => e.stopPropagation()}>
        <div className={css.navlist}>
          <ul>
            <li className={css.navlinksI}>
              <NavBtn btnName="Projects" navTo={toApps} icon="" />
            </li>

            <li className={css.navlinksI}>
              <NavBtn btnName="Upcoming NFT Sales" navTo={toUpcoming} icon={iFire} />
            </li>

            <li className={css.navlinksI}>
              <NavBtn btnName="Submit" navTo={toSubmit} icon="" />
            </li>

            {user && (
              <li className={css.navlinksI}>
                <NavBtn btnName="Profile" navTo={toProfile} icon="" />
              </li>
            )}

            {((user && user.uid === k.TWITTER_ADMIN_1) ||
              (user && user.uid === k.TWITTER_ADMIN_2)) && (
              <li className={css.navlinksI}>
                <NavBtn btnName="Admin" navTo={toAdmin} icon="" />
              </li>
            )}

            {!user && (
              <li className={css.navlinksI}>
                <div id={css.signInBtn}>
                  <SignInBtn />
                </div>
              </li>
            )}
          </ul>

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
