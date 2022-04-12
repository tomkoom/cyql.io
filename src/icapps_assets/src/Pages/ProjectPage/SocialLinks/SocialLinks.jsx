import React from "react";
import css from "./SocialLinks.module.css";

import {
  iLink,
  iTwitter,
  iTelegram,
  iDiscord,
  iMedium,
  iGithub,
  iExternalLink,
} from "../../../Icons/Icons";

const SocialLinks = ({
  // ic
  canister,
  dscvr,
  distrikt,
  openChat,
  // links
  website,
  app,
  twitter,
  discord,
  github,
  telegram,
  medium,
}) => {
  const getTwitterUsername = (url) => {
    const username = url.split(".com/")[1];
    return "@" + username;
  };

  const icLinks = [
    {
      name: "Canister",
      link: canister,
      icon: "🛢️",
      img: "",
    },
    {
      name: "Dscvr",
      link: dscvr,
      icon: "",
      img: "https://i.postimg.cc/ZqN5BX1m/dscvr.jpg",
    },
    {
      name: "Distrikt",
      link: distrikt,
      icon: "",
      img: "https://i.postimg.cc/YqcjBq5f/distrikt-app-logo.jpg",
    },
    {
      name: "OpenChat",
      link: openChat,
      icon: "",
      img: "",
    },
  ];

  const links = [
    {
      id: "Website",
      name: "Website",
      link: website,
      icon: iLink,
    },
    {
      id: "App",
      name: "App",
      link: app,
      icon: iExternalLink,
    },
    {
      id: "Twitter",
      name: getTwitterUsername(twitter),
      link: twitter,
      icon: iTwitter,
    },
    {
      id: "Discord",
      name: "Discord",
      link: discord,
      icon: iDiscord,
    },
    {
      id: "Telegram",
      name: "Telegram",
      link: telegram,
      icon: iTelegram,
    },
    {
      id: "GitHub",
      name: "GitHub",
      link: github,
      icon: iGithub,
    },
    {
      id: "Medium",
      name: "Medium",
      link: medium,
      icon: iMedium,
    },
  ];

  return (
    <div>
      {/* ic links */}
      {canister || dscvr || distrikt || openChat ? (
        <ul className={css.links}>
          {icLinks.map(({ name, link, icon, img }) => (
            <li
              key={name}
              data-social={name}
              className={css.links__item}
              style={link ? null : { display: "none" }}
            >
              <a href={link} target="_blank" rel="noopener noreferrer">
                {icon ? icon : img ? <img src={img} alt={`${name} logo`} /> : null}
                <span>{name}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}

      {/* links */}
      {website || app || twitter || discord || github || telegram || medium ? (
        <div>
          <ul className={css.links}>
            {links.map(({ id, name, link, icon }) => (
              <li
                key={id}
                data-social={id}
                className={css.links__item}
                style={link ? null : { display: "none" }}
              >
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {icon}&nbsp;<span>{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SocialLinks;
