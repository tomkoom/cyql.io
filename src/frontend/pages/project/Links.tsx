import React, { FC, ReactNode } from "react"
import styled from "styled-components"
import { twitterUsername } from "@/utils/twitterUsername"

// icons
import {
  iLink,
  iX,
  iTelegram,
  iDiscord,
  iMedium,
  iGithub,
  iExternalLink,
  iBook,
  iCircleNodes,
  iScroll,
} from "@/components/icons/Icons"

interface Link {
  id: string
  label: string
  url: string
  icon: ReactNode
  tag: string
}

interface LinkProps {
  [key: string]: string
}

const Links: FC<LinkProps> = ({
  // main
  website,
  canister,
  app,
  docs,
  whitepaper,

  // ic
  dscvr,
  distrikt,
  openchat,
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
}): JSX.Element => {
  const links: Link[] = [
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
      label: `@${twitterUsername(twitter)}`,
      url: twitter,
      icon: iX,
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
      tag: "social_ic",
    },
    {
      id: "distrikt",
      label: "Distrikt",
      url: distrikt,
      icon: "",
      tag: "social_ic",
    },
    {
      id: "openchat",
      label: "OpenChat",
      url: openchat,
      icon: "",
      tag: "social_ic",
    },
    {
      id: "taggr",
      label: "#TAGGR",
      url: taggr,
      icon: "",
      tag: "social_ic",
    },
    {
      id: "seers",
      label: "Seers",
      url: seers,
      icon: "",
      tag: "social_ic",
    },
    {
      id: "nuance",
      label: "Nuance",
      url: nuance,
      icon: "",
      tag: "social_ic",
    },
    {
      id: "catalyze",
      label: "Catalyze",
      url: catalyze,
      icon: "",
      tag: "social_ic",
    },
    {
      id: "funded",
      label: "Funded",
      url: funded,
      icon: "",
      tag: "social_ic",
    },
  ]

  if (links.length < 1) return null

  return (
    <LinksStyled>
      {links.map(
        (link) =>
          link.url && (
            <li data-social={link.id} key={link.id}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.icon && <span>{link.icon}</span>}
                {link.label}
              </a>
            </li>
          )
      )}
    </LinksStyled>
  )
}

const LinksStyled = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 0.25rem;
  margin: 1rem 0;

  > li {
    > a {
      height: 2.5rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: var(--fs6);
      font-weight: var(--fwBold);
      color: #fff;
      padding: 0 0.75rem;
      border-radius: 1.25rem;
      white-space: nowrap;
      cursor: pointer;
    }

    /* not branded */

    &[data-social="website"] a,
    &[data-social="canister"] a,
    &[data-social="app"] a,
    &[data-social="docs"] a,
    &[data-social="whitepaper"] a,
    &[data-social="dscvr"] a,
    &[data-social="distrikt"] a,
    &[data-social="openchat"] a,
    &[data-social="taggr"] a,
    &[data-social="seers"] a,
    &[data-social="nuance"] a,
    &[data-social="catalyze"] a,
    &[data-social="medium"] a {
      background-color: var(--underlay1);
      color: var(--primaryColor);
      transition: var(--transition1);
    }

    &[data-social="website"] a:hover,
    &[data-social="canister"] a:hover,
    &[data-social="app"] a:hover,
    &[data-social="docs"] a:hover,
    &[data-social="whitepaper"] a:hover,
    &[data-social="dscvr"] a:hover,
    &[data-social="distrikt"] a:hover,
    &[data-social="openchat"] a:hover,
    &[data-social="taggr"] a:hover,
    &[data-social="seers"] a:hover,
    &[data-social="nuance"] a:hover,
    &[data-social="catalyze"] a:hover,
    &[data-social="medium"] a:hover {
      background-color: var(--primaryColor);
      color: var(--background);
    }

    /* branded */

    &[data-social="twitter"] a {
      background-color: var(--colorTwitter);
    }

    &[data-social="discord"] a {
      background-color: var(--colorDiscord);
    }

    &[data-social="telegram"] a {
      background-color: var(--colorTelegram);
    }

    &[data-social="github"] a {
      background-color: var(--colorGitHub);
    }

    &[data-social="crowdfundingurl"] a {
      background-color: var(--colorCrowdfundNft);
    }

    &[data-social="twitter"] a,
    &[data-social="discord"] a,
    &[data-social="telegram"] a,
    &[data-social="github"] a,
    &[data-social="crowdfundingurl"] a:hover {
      transition: var(--transition1);
    }

    &[data-social="twitter"] a:hover,
    &[data-social="discord"] a:hover,
    &[data-social="telegram"] a:hover,
    &[data-social="github"] a:hover,
    &[data-social="crowdfundingurl"] a:hover {
      opacity: 0.8;
    }
  }
`

export default Links
