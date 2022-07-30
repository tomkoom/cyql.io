import React from "react";
import css from "./Socials.module.css";

// icons
import { iTwitter, iDiscord, iMediumM } from "../../Icons/Icons";

const socials = [
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

const Socials = () => {
  return (
    <ul className={css.socials}>
      {socials.map(({ label, link, icon, logo }) => (
        <li className={css.socialsI} data-link={label} key={label}>
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
  );
};

export default Socials;
