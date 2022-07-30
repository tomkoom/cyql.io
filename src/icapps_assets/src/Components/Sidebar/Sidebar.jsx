import React from "react";
import css from "./Sidebar.module.css";
import k from "../../../../../k/k";

// icons
import { iCube, iRocket, iPlus, iDatabase } from "../../Icons/Icons";
import { iTwitter, iDiscord, iMediumM } from "../../Icons/Icons";

// routes
import { toApps, toUpcoming, toSubmit, toAdmin } from "../../Routes/routes";

// auth
import { useAuth } from "../../Context/AuthContext";

// components
import NavLink from "./NavLink/NavLink";
import { Theme, Price } from "../index";

const links = [
  {
    label: "Twitter",
    link: "https://twitter.com/DfinityApps",
    icon: iTwitter,
    logo: "",
  },
  {
    label: "Discord",
    link: "https://discord.gg/qQ8MNv6Hju",
    icon: iDiscord,
    logo: "",
  },
  {
    label: "Medium",
    link: "https://medium.com/@icappsxyz",
    icon: iMediumM,
    logo: "",
  },
  {
    label: "Entrepot",
    link: "https://entrepot.app/marketplace/ic-apps",
    icon: "",
    logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/entrepot/entrepot-logo.png",
  },
];

const Sidebar = () => {
  const { principalIdStr } = useAuth();

  return (
    <div className={css.sidebar}>
      <div className={css.nav}>
        <NavLink label="Projects" to={toApps} icon={iCube} />
        <NavLink label="Upcoming NFTs" to={toUpcoming} icon={iRocket} />
        <NavLink label="Submit" to={toSubmit} icon={iPlus} />

        {(principalIdStr && principalIdStr === k.PLUG_ADMIN_1) ||
        (principalIdStr && principalIdStr === k.PLUG_ADMIN_2) ? (
          <NavLink label="Admin" to={toAdmin} icon={iDatabase} />
        ) : null}
      </div>

      <div className={css.controls}>
        <Theme />
        <Price />
      </div>

      <hr className={css.div} />

      {/* links */}
      <ul className={css.links}>
        {links.map(({ label, link, icon, logo }) => (
          <li className={css.linksI} data-link={label} key={label}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {icon ? (
                <span className={css.icon}>{icon}</span>
              ) : (
                <span className={css.icon}>
                  <img className={css.logo} src={logo} alt={`${label}-logo`} />
                </span>
              )}
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
