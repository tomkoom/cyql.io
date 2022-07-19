import React from "react";
import css from "./NavMid.module.css";

// components
import { Logo } from "../../index";
import { Desktop, Mobile } from "./index";

// utils
import { useWindowSize } from "../../../Utils/UseWindowSize";

// icons
import { iTwitter, iDiscord } from "../../../Icons/Icons";

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

      {deviceWidth > 1023 ? <Desktop /> : <Mobile />}
    </div>
  );
};

export default NavMid;
