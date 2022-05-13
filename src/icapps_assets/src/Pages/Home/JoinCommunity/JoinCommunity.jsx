import React from "react";
import css from "./JoinCommunity.module.css";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";

const iconTwitter = (
  <FontAwesomeIcon icon={faTwitter} className={css.socIcon} color="#00acee" />
);
const iconDiscord = (
  <FontAwesomeIcon icon={faDiscord} className={css.socIcon} color="#5865f2" />
);

const socLinks = [
  {
    name: "Twitter",
    link: "https://twitter.com/DfinityApps",
    icon: iconTwitter,
  },
  { name: "Discord", link: "https://discord.gg/AnjyrfvvXX", icon: iconDiscord },
];

const JoinCommunity = () => {
  return (
    <ul className={css.links}>
      {socLinks.map(({ name, link, icon }) => (
        <li className={css.linksI} key={name}>
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
