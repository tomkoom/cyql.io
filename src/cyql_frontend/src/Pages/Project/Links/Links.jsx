import React from "react";
import css from "./Links.module.css";

// utils
import { getTwitterUsername } from "@utils/format";

// icons
import {
  iLink,
  iTwitter,
  iTelegram,
  iDiscord,
  iMedium,
  iGithub,
  iExternalLink,
  iBook,
  iCircleNodes,
  iScroll,
} from "@icons/Icons";

const Links = ({
  // main
  website,
  canister,
  app,
  docs,
  whitepaper,

  // ic
  dscvr,
  distrikt,
  openChat,
  taggr,
  seers,
  nuance,
  catalyze,

  // soc
  twitter,
  discord,
  github,
  telegram,
  medium,
}) => {
  const links = [
    // main
    {
      id: "website",
      label: "Website",
      url: website,
      icon: iLink,
      tag: "main",
    },
    {
      id: "canister",
      label: "Canister",
      url: canister,
      icon: iCircleNodes,
      tag: "main",
    },
    {
      id: "app",
      label: "App",
      url: app,
      icon: iExternalLink,
      tag: "main",
    },
    {
      id: "docs",
      label: "Docs",
      url: docs,
      icon: iBook,
      tag: "main",
    },
    {
      id: "whitepaper",
      label: "Whitepaper",
      url: whitepaper,
      icon: iScroll,
      tag: "main",
    },

    // socials
    {
      id: "twitter",
      label: `@${getTwitterUsername(twitter)}`,
      url: twitter,
      icon: iTwitter,
      tag: "social",
    },
    {
      id: "discord",
      label: "Discord",
      url: discord,
      icon: iDiscord,
      tag: "social",
    },
    {
      id: "telegram",
      label: "Telegram",
      url: telegram,
      icon: iTelegram,
      tag: "social",
    },
    {
      id: "github",
      label: "GitHub",
      url: github,
      icon: iGithub,
      tag: "social",
    },
    {
      id: "medium",
      label: "Medium",
      url: medium,
      icon: iMedium,
      tag: "social",
    },

    // socials ic
    {
      id: "dscvr",
      label: "Dscvr",
      url: dscvr,
      icon: "",
      tag: "socialIc",
    },
    {
      id: "distrikt",
      label: "Distrikt",
      url: distrikt,
      icon: "",
      tag: "socialIc",
    },
    {
      id: "openchat",
      label: "OpenChat",
      url: openChat,
      icon: "",
      tag: "socialIc",
    },
    {
      id: "taggr",
      label: "TAGGR",
      url: taggr,
      icon: "",
      tag: "socialIc",
    },
    {
      id: "seers",
      label: "Seers",
      url: seers,
      icon: "",
      tag: "socialIc",
    },
    {
      id: "nuance",
      label: "Nuance",
      url: nuance,
      icon: "",
      tag: "socialIc",
    },
    {
      id: "catalyze",
      label: "Catalyze",
      url: catalyze,
      icon: "",
      tag: "socialIc",
    },
  ];

  return (
    links.length > 0 && (
      <ul className={css.links}>
        {links.map(
          (l) =>
            l.url && (
              <li className={css.linksI} data-social={l.id} key={l.label}>
                <a href={l.url} target="_blank" rel="noopener noreferrer">
                  {l.icon && <span>{l.icon}</span>}
                  {l.label && <p className={css.label}>{l.label}</p>}
                </a>
              </li>
            )
        )}
      </ul>
    )
  );
};

export default Links;
