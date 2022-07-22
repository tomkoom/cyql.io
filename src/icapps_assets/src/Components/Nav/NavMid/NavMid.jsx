import React from "react";
import css from "./NavMid.module.css";

// components
import { Logo } from "../../index";
import { Desktop, Mobile } from "./index";

// utils
import { useWindowSize } from "../../../Utils/UseWindowSize";

// icons
import { iTwitter, iDiscord, iMediumM } from "../../../Icons/Icons";

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
    emoji: "",
  },
  {
    name: "Discord",
    link: "https://discord.gg/qQ8MNv6Hju",
    icon: iDiscord,
    emoji: "",
  },
  {
    name: "Medium",
    link: "https://medium.com/@icappsxyz",
    icon: iMediumM,
    emoji: "",
  },
  {
    name: "Entrepot",
    link: "https://entrepot.app/marketplace/ic-apps",
    icon: "",
    emoji: "🛍️",
  },
];

const NavMid = () => {
  const dispatch = useDispatch();
  const [deviceWidth] = useWindowSize();
  const mobileMenuModal = useSelector(selectMobileMenuModal);

  const handleLogoClick = (action) => {
    action();
    mobileMenuModal && dispatch(setMobileMenuModal(false));
  };

  return (
    <div className={css.nav}>
      <div className={css.content}>
        {/* logo */}
        <button
          className="navlink"
          onClick={() => {
            handleLogoClick(toHome());
          }}
        >
          <Logo />
        </button>

        {/* soclinks */}
        <ul className={css.socLinks}>
          {socLinks.map(({ name, link, icon, emoji }, i) => (
            <li className={css.socLinksI} data-link={name} key={i}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {icon ? icon : emoji}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {deviceWidth > 1023 ? <Desktop /> : <Mobile />}
    </div>
  );
};

export default NavMid;
