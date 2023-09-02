import React, { FC } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDiscord, faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { iAngleRight } from "@/components/icons/Icons"

const JoinCommunity: FC = (): JSX.Element => {
  return (
    <JoinCommunityStyled>
      {links.map(({ id, label, link, icon }) => (
        <li key={id}>
          <a id={id} href={link} rel="noreferrer noopener" target="_blank">
            {icon}
            <span>
              {label} {iAngleRight}
            </span>
          </a>
        </li>
      ))}
    </JoinCommunityStyled>
  )
}

const JoinCommunityStyled = styled.ul`
  display: flex;
  gap: 1rem;
  padding-top: 0.5rem;
  flex-wrap: wrap;

  @media ${device.tablet} {
    flex-direction: column;
  }

  > li {
    flex: 1;

    > a {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
      font-weight: var(--fwMedium);
      background-color: var(--underlay1);
      padding: 1.25rem;
      border-radius: 0.75rem;

      &#x-twitter:hover {
        background-color: var(--colorX);
      }

      &#discord:hover {
        background-color: var(--colorDiscord);
      }

      > span {
        font-size: var(--fs6);
      }
    }
  }
`

const Icon = styled(FontAwesomeIcon)`
  font-size: var(--fs3);
`

const iconTwitter = <Icon icon={faXTwitter} id="twitter" color="var(--primaryColor)" />
const iconDiscord = <Icon icon={faDiscord} id="discord" color="var(--primaryColor)" />

const links = [
  {
    id: "x-twitter",
    label: "X / Twitter",
    link: "https://x.com/cyqlio",
    icon: iconTwitter,
  },
  { id: "discord", label: "Discord", link: "https://discord.gg/AnjyrfvvXX", icon: iconDiscord },
]

export default JoinCommunity
