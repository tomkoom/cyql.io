import React, { FC, ReactNode } from "react"
import styled from "styled-components"
import { twitterUsername } from "@/utils/twitterUsername"
import { ProjectV2 } from "@/state/_types/curated_projects_types"

// icons
import {
  iLink,
  iX,
  iTelegram,
  iDiscord,
  iMedium,
  iGithub,
  iExternalLink,
  // iBook,
  // iScroll,
} from "@/components/icons/Icons"

interface Link {
  id: string
  label: string
  url: string
  icon: ReactNode
  tag: string
}

interface LinkProps {
  project: ProjectV2
}

const Links: FC<LinkProps> = ({ project }): JSX.Element => {
  const links: Link[] = [
    // main
    {
      id: "website",
      label: "Website",
      url: project.website,
      icon: iLink,
      tag: "main",
    },
    {
      id: "app",
      label: "App",
      url: project.app,
      icon: iExternalLink,
      tag: "main",
    },

    // token

    // socials
    {
      id: "twitter",
      label: `@${twitterUsername(project.twitter)}`,
      url: project.twitter,
      icon: iX,
      tag: "social",
    },
    {
      id: "discord",
      label: "Discord",
      url: project.discord,
      icon: iDiscord,
      tag: "social",
    },
    {
      id: "telegram",
      label: "Telegram",
      url: project.telegram,
      icon: iTelegram,
      tag: "social",
    },
    {
      id: "github",
      label: "GitHub",
      url: project.github,
      icon: iGithub,
      tag: "social",
    },
    {
      id: "medium",
      label: "Medium",
      url: project.medium,
      icon: iMedium,
      tag: "social",
    },

    // socials ic
    {
      id: "dscvr",
      label: "Dscvr",
      url: project.dscvr,
      icon: "",
      tag: "social_ic",
    },
    {
      id: "openchat",
      label: "OpenChat",
      url: project.openchat,
      icon: "",
      tag: "social_ic",
    },
    {
      id: "taggr",
      label: "#TAGGR",
      url: project.taggr,
      icon: "",
      tag: "social_ic",
    },
    {
      id: "nuance",
      label: "Nuance",
      url: project.nuance,
      icon: "",
      tag: "social_ic",
    },
    {
      id: "catalyze",
      label: "Catalyze",
      url: project.catalyze,
      icon: "",
      tag: "social_ic",
    },
    {
      id: "funded",
      label: "Funded",
      url: project.funded,
      icon: "",
      tag: "social_ic",
    },
  ]

  if (links.length < 1) return null

  return (
    <LinksStyled>
      <ul>
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
      </ul>

      <div className="about">
        {/* dfinity forum showcase url */}
        {project.dfinityForumShowcase && (
          <a href={project.dfinityForumShowcase} target="_blank" rel="noreferrer noopener">
            DFINITY Forum Showcase <span>{iExternalLink}</span>
          </a>
        )}

        {/* nns launchpad url */}
        {project.nnsLaunchpadUrl && (
          <a href={project.nnsLaunchpadUrl} target="_blank" rel="noreferrer noopener">
            NNS Launchpad URL <span>{iExternalLink}</span>
          </a>
        )}

        {/* docs */}
        {project.docs && (
          <a href={project.docs} target="_blank" rel="noreferrer noopener">
            Docs <span>{iExternalLink}</span>
          </a>
        )}

        {/* faq */}
        {project.faq && (
          <a href={project.faq} target="_blank" rel="noreferrer noopener">
            FAQ <span>{iExternalLink}</span>
          </a>
        )}

        {/* whitepaper */}
        {project.whitepaper && (
          <a href={project.whitepaper} target="_blank" rel="noreferrer noopener">
            Whitepaper <span>{iExternalLink}</span>
          </a>
        )}
      </div>

      {/* frontend canister */}
      {project.frontendCanisterId.length === 27 && (
        <div>
          <p>Frontend canister id:</p>
          <p>{project.frontendCanisterId}</p>
        </div>
      )}

      {project.frontendCanisterId.length > 27 && (
        <a href={project.frontendCanisterId} target="_blank" rel="noopener noreferrer">
          Frontend Canister URL {iExternalLink}
        </a>
      )}

      {/* backend canister */}
      {project.backendCanisterId && (
        <div>
          <p>Backend canister id:</p>
          <p>{project.backendCanisterId}</p>
        </div>
      )}

      {/* token */}
      {project.tokenCanisterId && (
        <div className="token">
          <p>Token ledger id:</p>
          <a
            href={`https://dashboard.internetcomputer.org/canister/${project.tokenCanisterId}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            {project.tokenCanisterId} <span>{iExternalLink}</span>
          </a>
        </div>
      )}
    </LinksStyled>
  )
}

const LinksStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  margin: 1.5rem 0;

  > div.about {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;

    > a {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.7rem;
      background-color: var(--underlay1);
      font-size: var(--fsText);
      transition: var(--transition1);

      &:hover {
        background-color: var(--underlay2);
      }

      > span {
        font-size: var(--fs7);
        color: var(--tertiaryColor);
      }
    }
  }

  > div.token {
    > a {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.7rem;
      background-color: var(--underlay1);
      font-size: var(--fsText);
      transition: var(--transition1);

      &:hover {
        background-color: var(--underlay2);
      }

      > span {
        font-size: var(--fs7);
        color: var(--tertiaryColor);
      }
    }
  }

  > ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 0.25rem;

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
        background-color: var(--colorX);
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
  }
`

export default Links
