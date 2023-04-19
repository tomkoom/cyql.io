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
  funded,

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
      label: "website",
      url: website,
      icon: iLink,
      tag: "main",
    },
    {
      id: "canister",
      label: "canister",
      url: canister,
      icon: iCircleNodes,
      tag: "main",
    },
    {
      id: "app",
      label: "app",
      url: app,
      icon: iExternalLink,
      tag: "main",
    },
    {
      id: "docs",
      label: "docs",
      url: docs,
      icon: iBook,
      tag: "main",
    },
    {
      id: "whitepaper",
      label: "whitepaper",
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
      label: "discord",
      url: discord,
      icon: iDiscord,
      tag: "social",
    },
    {
      id: "telegram",
      label: "telegram",
      url: telegram,
      icon: iTelegram,
      tag: "social",
    },
    {
      id: "github",
      label: "github",
      url: github,
      icon: iGithub,
      tag: "social",
    },
    {
      id: "medium",
      label: "medium",
      url: medium,
      icon: iMedium,
      tag: "social",
    },

    // socials ic
    {
      id: "dscvr",
      label: "dscvr",
      url: dscvr,
      icon: "",
      tag: "socialIc",
    },
    {
      id: "distrikt",
      label: "distrikt",
      url: distrikt,
      icon: "",
      tag: "socialIc",
    },
    {
      id: "openchat",
      label: "openchat",
      url: openChat,
      icon: "",
      tag: "socialIc",
    },
    {
      id: "taggr",
      label: "taggr",
      url: taggr,
      icon: "",
      tag: "socialIc",
    },
    {
      id: "seers",
      label: "seers",
      url: seers,
      icon: "",
      tag: "socialIc",
    },
    {
      id: "nuance",
      label: "nuance",
      url: nuance,
      icon: "",
      tag: "socialIc",
    },
    {
      id: "catalyze",
      label: "catalyze",
      url: catalyze,
      icon: "",
      tag: "socialIc",
    },
    {
      id: "funded",
      label: "funded.app",
      url: funded,
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
