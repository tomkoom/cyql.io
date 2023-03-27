import React from "react";
import css from "./Socials.module.css";

// icons
import { iTwitter, iDiscord } from "@icons/Icons";

const socials = [
  {
    label: "Twitter",
    link: "https://twitter.com/cyqlio",
    icon: iTwitter,
    logo: "",
  },
  {
    label: "Discord",
    link: "https://discord.gg/qQ8MNv6Hju",
    icon: iDiscord,
    logo: "",
  },
  // {
  //   label: "Medium",
  //   link: "https://medium.com/@cyql",
  //   icon: iMediumM,
  //   logo: "",
  // },
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
      {socials.map((s) => (
        <li className={css.socialsI} key={s.label}>
          <a href={s.link} target="_blank" rel="noopener noreferrer">
            {s.icon ? (
              <span id={css[s.label.toLowerCase()]} className={css.icon}>
                {s.icon}
              </span>
            ) : (
              <span className={css.icon}>
                <img className={css.logo} src={s.logo} alt={`${s.label} logo`} />
              </span>
            )}
            {s.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Socials;
