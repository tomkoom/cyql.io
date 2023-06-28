import React from "react";
import css from "./Socials.module.css";

// icons
import { iTwitter, iDiscord } from "@/components/icons/Icons";

const Socials = () => {
  const socials = [
    {
      label: "Twitter",
      link: "https://twitter.com/cyqlio",
      icon: iTwitter,
    },
    {
      label: "Discord",
      link: "https://discord.gg/qQ8MNv6Hju",
      icon: iDiscord,
    },
  ];

  return (
    <ul className={css.socials}>
      {socials.map((s) => (
        <li className={css.socialsI} key={s.label}>
          {s.link && (
            <a
              id={css[s.label.toLowerCase()]}
              className={css.link}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.icon ? s.icon : ""}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Socials;
