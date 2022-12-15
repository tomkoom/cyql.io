import React from "react";
import css from "./Socials.module.css";

// icons
import { iTwitter, iDiscord } from "@icons/Icons";

export const Socials = () => {
  const socials = [
    { id: "twitter", link: "https://twitter.com/cyql_icp", icon: iTwitter },
    { id: "discord", link: "https://discord.gg/AnjyrfvvXX", icon: iDiscord },
    // { id: "medium", link: "https://medium.com/@cyql", icon: iMediumM },
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
