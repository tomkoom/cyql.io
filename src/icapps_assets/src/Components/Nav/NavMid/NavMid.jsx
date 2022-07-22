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
    img: "",
  },
  {
    name: "Discord",
    link: "https://discord.gg/qQ8MNv6Hju",
    icon: iDiscord,
    img: "",
  },
  {
    name: "Medium",
    link: "https://medium.com/@icappsxyz",
    icon: iMediumM,
    img: "",
  },
  {
    name: "Entrepot",
    link: "https://entrepot.app/marketplace/ic-apps",
    icon: "",
    img: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/entrepot/entrepot-logo.png",
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
          {socLinks.map(({ name, link, icon, img }, i) => (
            <li className={css.socLinksI} data-link={name} key={i}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {icon ? icon : <img className={css.brandLogo} src={img} alt="entrepot-logo" />}
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
