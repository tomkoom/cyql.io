import React, { FC } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"
import { X_URL, DISCORD_URL } from "@/constants/constants"

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDiscord, faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { iAngleRight } from "@/components/icons/Icons"

const JoinCommunity: FC = (): JSX.Element => {
  const iconTwitter = <Icon icon={faXTwitter} id="twitter" />
  const iconDiscord = <Icon icon={faDiscord} id="discord" />

  const links = [
    {
      id: "x",
      label: "X / Twitter",
      link: X_URL,
      icon: iconTwitter,
    },
    { id: "discord", label: "Discord", link: DISCORD_URL, icon: iconDiscord },
  ]

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

      &#x:hover {
        color: var(--coolGray10);
        background-color: var(--colorX);
      }

      &#discord:hover {
        color: var(--coolGray10);
        background-color: var(--colorDiscord);
      }

      > span {
        font-size: var(--fs6);
      }
    }
  }
`

const Icon = styled(FontAwesomeIcon)`
  font-size: var(--fs4);
`

export default JoinCommunity
