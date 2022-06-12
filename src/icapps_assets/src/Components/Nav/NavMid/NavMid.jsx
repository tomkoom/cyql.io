import React from "react";
import css from "./NavMid.module.css";

// components
import { Logo, NavLinks } from "../../index";
import NavMobileMenu from "../NavMobileMenu/NavMobileMenu";

// utils
import { useWindowSize } from "../../../Utils/UseWindowSize";

// icons
import { iTwitter, iDiscord, iBars } from "../../../Icons/Icons";

// navlinks
import { toHome } from "../../../Routes/routes";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectMobileMenuModal, setMobileMenuModal } from "../../../State/modals";

const socLinks = [
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
            mobileMenuModal && dispatch(setMobileMenuModal(false));
          }}
        >
          <Logo />
        </button>

        {/* soclinks */}
        <ul className={css.socLinks}>
          {socLinks.map(({ name, link, icon }, i) => (
            <li className={css.socLinksI} data-link={name} key={i}>
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

      {/* open mobile menu if width is less than 1024 */}
      {deviceWidth < 1024 && mobileMenuModal && <NavMobileMenu />}

      {/* navlinks */}
      <NavLinks location="nav" />
    </div>
  );
};

export default NavMid;
