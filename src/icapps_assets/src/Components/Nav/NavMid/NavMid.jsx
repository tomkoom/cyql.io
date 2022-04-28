import React from "react";
import css from "./NavMid.module.css";
import logoImg from "../../../../assets/logo.svg";
import NavMobileMenu from "../NavMobileMenu/NavMobileMenu";
import k from "../../../../../../k/k";

// utils
import { useWindowSize } from "../../../Utils/UseWindowSize";

// icons
import { iTwitter, iDiscord, iBars } from "../../../Icons/Icons";

// routes, navlinks
import { toHome, toAdmin, toProfile } from "../../../Routes/routes";
import { navLinks } from "../../../Routes/navLinks";

// auth
import { useAuth } from "../../../Context/AuthContext";
import { SignInModal } from "../../index";

// state
import { useSelector, useDispatch } from "react-redux";
import {
  selectMobileMenuModal,
  setMobileMenuModal,
  selectSignInModal,
  setSignInModal,
} from "../../../State/modals";

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
  const signInModal = useSelector(selectSignInModal);
  const mobileMenuModal = useSelector(selectMobileMenuModal);

  return (
    <div className={css.nav}>
      <div className={css.nav__main}>
        {/* logo */}
        <button
          className={`${css.logo} navlink`}
          onClick={() => {
            toHome();
            mobileMenuModal ? dispatch(setMobileMenuModal(false)) : null;
          }}
        >
          <img src={logoImg} alt="icApps.xyz logo" />
          <h1>icApps</h1>
        </button>

        {/* soclinks */}
        <ul className={css.nav__main__socLinks}>
          {socialLinks.map(({ name, link, icon }, i) => (
            <li className={css.nav__main__socLinks__item} data-smlink={name} key={i}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {icon}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* menu btn */}
      <div className={css.nav__menuBtn} onClick={() => dispatch(setMobileMenuModal(true))}>
        {iBars}
      </div>

      {deviceWidth < 1024 && mobileMenuModal ? <NavMobileMenu /> : null}

      {/* navlinks */}
      <ul className={css.nav__list}>
        {navLinks.map(({ name, link, icon }, i) => (
          <li className={css.nav__list__item} key={i}>
            <button
              className="navlink"
              onClick={() => {
                link();
                mobileMenuModal ? dispatch(setMobileMenuModal(false)) : null;
              }}
            >
              {icon ? <span>{icon}</span> : null} {name}
            </button>
          </li>
        ))}

        {/* <li className={`${css.nav__list__item} ${css.donateContainer}`}>
          <div className={css.donateBtn} onClick={() => setModalIsActive(true)}>
            <p>Donate</p>
          </div>
        </li> */}

        {!user && (
          <li className={css.nav__list__item}>
            <button className="navlink" onClick={() => dispatch(setSignInModal(true))}>
              Sign in
            </button>
          </li>
        )}

        {user && (
          <li className={css.nav__list__item}>
            <button
              className="navlink"
              onClick={() => {
                toProfile();
                mobileMenuModal ? dispatch(setMobileMenuModal(false)) : null;
              }}
            >
              Profile
            </button>
          </li>
        )}

        {(user && user.uid === k.TWITTER_ADMIN_1) || (user && user.uid === k.TWITTER_ADMIN_2) ? (
          <li className={css.nav__list__item}>
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
      {signInModal && <SignInModal />}
    </div>
  );
};

export default NavMid;
