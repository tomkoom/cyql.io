import React from "react";
import css from "./JoinCommunity.module.css";

// icons
import { iDiscord, iTwitter } from "../../../Icons/Icons";

const socLinks = [
  {
    name: "Twitter",
    link: "https://twitter.com/DfinityApps",
    icon: iTwitter,
  },
  { name: "Discord", link: "https://discord.gg/AnjyrfvvXX", icon: iDiscord },
];

const JoinCommunity = () => {
  return (
    <ul className={css.links}>
      {socLinks.map(({ name, link, icon }) => (
        <li className={css.links__i} key={name}>
          <a href={link} rel="noreferrer noopener" target="_blank">
            {icon}
            {name} &gt;
          </a>
        </li>
      ))}
    </ul>
  );
};

export default JoinCommunity;
