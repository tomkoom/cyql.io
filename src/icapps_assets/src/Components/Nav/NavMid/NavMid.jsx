import React, { useState, useEffect } from "react";
import css from "./NavMid.module.css";
import logoImg from "../../../../assets/logo.svg";
import NavMobile from "../NavMobile";
import k from "../../../../../../k/k";

// utils
import { useWindowSize } from "../../../Utils/UseWindowSize";
import { deviceSizes } from "../../../Utils/DeviceSizes";

// icons
import { iTwitter, iDiscord, iBars } from "../../../Icons/Icons";

// routes, navlinks
import { toHome, toAdmin } from "../../../Routes/routes";
import { navLinks } from "../../../Routes/navLinks";

// auth
import { useAuth } from "../../../Context/AuthContext";

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
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [deviceWidth, deviceHeight] = useWindowSize();

  // auth
  const { signInWithTwitter, logOut, userUID } = useAuth();

  function resetMenu() {
    if (deviceWidth > deviceSizes.desktop) {
      setMenuIsOpen(false);
    }
  }

  useEffect(() => {
    resetMenu();
  }, [deviceWidth]);

  return (
    <div className={css.nav}>
      <div className={css.nav__main}>
        {/* logo */}
        <button
          className={`${css.logo} navlink`}
          onClick={() => {
            toHome();
            menuIsOpen ? setMenuIsOpen(false) : null;
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
      <div className={css.nav__menuBtn} onClick={() => setMenuIsOpen(true)}>
        {iBars}
      </div>

      {deviceWidth < 1024 && menuIsOpen ? (
        <NavMobile menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      ) : null}

      {/* navlinks */}
      <ul className={css.nav__list}>
        {navLinks.map(({ name, link, icon }, i) => (
          <li className={css.nav__list__item} key={i}>
            <button
              className="navlink"
              onClick={() => {
                link();
                menuIsOpen ? setMenuIsOpen(false) : null;
              }}
            >
              {icon ? <span>{icon}</span> : null} {name}
            </button>
          </li>
        ))}

        <li className={`${css.nav__list__item} ${css.donateContainer}`}>
          <div className={css.donateBtn} onClick={() => setModalIsActive(true)}>
            <p>Donate</p>
          </div>
        </li>

        {/* {!userUID && (
          <li className={css.nav__list__item}>
            <button className="navlink" onClick={signInWithTwitter}>
              Sign in
            </button>
          </li>
        )}

        {userUID && (
          <li className={css.nav__list__item}>
            <button className="navlink" onClick={logOut}>
              Sign out
            </button>
          </li>
        )}

        {userUID && userUID == k.TWITTER_ADMIN_1 && (
          <li className={css.nav__list__item}>
            <button
              className="navlink"
              onClick={() => {
                toAdmin();
                menuIsOpen ? setMenuIsOpen(false) : null;
              }}
            >
              Admin
            </button>
          </li>
        )} */}
      </ul>
    </div>
  );
};

export default NavMid;
