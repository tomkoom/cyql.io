import React from "react";
import css from "./NavMid.module.css";
import k from "../../../../../../k/k";

// components
import { Logo } from "../../index";
import NavMobileMenu from "../NavMobileMenu/NavMobileMenu";

// utils
import { useWindowSize } from "../../../Utils/UseWindowSize";

// icons
import { iTwitter, iDiscord, iBars } from "../../../Icons/Icons";

// routes, navlinks
import { toHome, toAdmin, toProfile } from "../../../Routes/routes";
import { navLinks } from "../../../Routes/navLinks";

// auth
import { useAuth } from "../../../Context/AuthContext";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectMobileMenuModal, setMobileMenuModal, setSignInModal } from "../../../State/modals";

const socialLinks = [
  {
    name: "Twitter",
    link: "https://twitter.com/DfinityApps",
    icon: iTwitter,
    color: "#00acee",
  },
  {
    name: "Discord",
    link: "https://discord.gg/qQ8MNv6Hju",
    icon: iDiscord,
    color: "#5865f2",
  },
];

const NavMid = () => {
  const [deviceWidth] = useWindowSize();
  const { user } = useAuth();

  const dispatch = useDispatch();
  const mobileMenuModal = useSelector(selectMobileMenuModal);

  return (
    <div className={css.nav}>
      <div className={css.content}>
        {/* logo */}
        <button
          className="navlink"
          onClick={() => {
            toHome();
            mobileMenuModal ? dispatch(setMobileMenuModal(false)) : null;
          }}
        >
          <Logo />
        </button>

        {/* soclinks */}
        <ul className={css.socLinks}>
          {socialLinks.map(({ name, link, icon }, i) => (
            <li className={css.socLinks__i} data-smlink={name} key={i}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {icon}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* menu btn */}
      <div className={css.menuBtn} onClick={() => dispatch(setMobileMenuModal(true))}>
        {iBars}
      </div>

      {deviceWidth < 1024 && mobileMenuModal ? <NavMobileMenu /> : null}

      {/* navlinks */}
      <ul className={css.navlinks}>
        {navLinks.map(({ name, link, icon }, i) => (
          <li className={css.navlinks__i} key={i}>
            <button
              className="navlink"
              onClick={() => {
                link();
                mobileMenuModal ? dispatch(setMobileMenuModal(false)) : null;
              }}
            >
              {icon && <span>{icon}</span>} {name}
            </button>
          </li>
        ))}

        {!user && (
          <li className={css.navlinks__i}>
            <button
              id={css.signInBtn}
              className="secondaryBtn"
              onClick={() => dispatch(setSignInModal(true))}
            >
              Sign in
            </button>
          </li>
        )}

        {user && (
          <li className={css.navlinks__i}>
            <button
              className="navlink"
              onClick={() => {
                toProfile();
                mobileMenuModal && dispatch(setMobileMenuModal(false));
              }}
            >
              Profile
            </button>
          </li>
        )}

        {(user && user.uid === k.TWITTER_ADMIN_1) || (user && user.uid === k.TWITTER_ADMIN_2) ? (
          <li className={css.navlinks__i}>
            <button
              className="navlink"
              onClick={() => {
                toAdmin();
                mobileMenuModal ? dispatch(setMobileMenuModal(false)) : null;
              }}
            >
              Admin
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default NavMid;
