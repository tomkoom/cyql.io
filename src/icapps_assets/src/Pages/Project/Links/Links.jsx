import React from "react";
import css from "./Links.module.css";

// icons
import {
  iLink,
  iTwitter,
  iTelegram,
  iDiscord,
  iMediumM,
  iGithub,
  iExternalLink,
  iBook,
} from "../../../Icons/Icons";

const Links = ({
  // ic
  canister,
  dscvr,
  distrikt,
  openChat,
  // links
  website,
  app,
  docs,
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
      label: "Canister",
      link: canister,
      logo: "",
    },
    {
      label: "Dscvr",
      link: dscvr,
      logo: "",
    },
    {
      label: "Distrikt",
      link: distrikt,
      logo: "",
    },
    {
      label: "OpenChat",
      link: openChat,
      logo: "",
    },
  ];

  const links = [
    {
      id: "Website",
      label: "Website",
      link: website,
      icon: iLink,
    },
    {
      id: "App",
      label: "App",
      link: app,
      icon: iExternalLink,
    },
    {
      id: "Docs",
      label: "Docs",
      link: docs,
      icon: iBook,
    },
    {
      id: "Twitter",
      label: getTwitterUsername(twitter),
      link: twitter,
      icon: iTwitter,
    },
    {
      id: "Discord",
      label: "Discord",
      link: discord,
      icon: iDiscord,
    },
    {
      id: "Telegram",
      label: "Telegram",
      link: telegram,
      icon: iTelegram,
    },
    {
      id: "GitHub",
      label: "GitHub",
      link: github,
      icon: iGithub,
    },
    {
      id: "Medium",
      label: "Medium",
      link: medium,
      icon: iMediumM,
    },
  ];

  return (
    <div className={css.links}>
      {/* ic */}
      <div>
        {canister || dscvr || distrikt || openChat ? (
          <ul className={css.linksLi}>
            {icLinks.map(
              ({ label, link }) =>
                link && (
                  <li className={css.linksLiI} data-social={label} key={label}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {label && <p className={css.label}>{label}</p>}
                    </a>
                  </li>
                )
            )}
          </ul>
        ) : (
          ""
        )}
      </div>

      {/* links */}
      <div>
        {website || app || twitter || discord || github || telegram || medium ? (
          <ul className={css.linksLi}>
            {links.map(
              ({ id, label, link, icon }) =>
                link && (
                  <li data-social={id} className={css.linksLiI} key={id}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      <span className={css.icon}>{icon}</span>
                      <p className={css.label}>{label}</p>
                    </a>
                  </li>
                )
            )}
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Links;
