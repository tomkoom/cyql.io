import React from "react";
import css from "./Socials.module.css";

// icons
import { iTwitter, iDiscord } from "@icons/Icons";

const Socials = () => {
  const socials = [
    { id: "twitter", link: "https://twitter.com/cyqlio", icon: iTwitter },
    { id: "discord", link: "https://discord.gg/AnjyrfvvXX", icon: iDiscord },
  ];

  return (
    <ul className={css.socials}>
      {socials.map((s) => (
        <li className={css.socialsI} key={s.id}>
          <a href={s.link} id={s.id} rel="noreferrer noopener" target="_blank">
            {s.icon}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Socials;