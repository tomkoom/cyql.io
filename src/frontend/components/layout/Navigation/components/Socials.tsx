import React, { FC } from "react"
import styled from "styled-components"
import { X_URL, DISCORD_URL } from "@/constants/constants"
import { iX, iDiscord } from "@/components/icons/Icons"

const Socials: FC = (): JSX.Element => {
  const socials = [
    {
      label: "X",
      link: X_URL,
      icon: iX,
    },
    {
      label: "Discord",
      link: DISCORD_URL,
      icon: iDiscord,
    },
  ]

  return (
    <SocialsStyled>
      {socials.map((s) => (
        <li key={s.label}>
          <a id={s.label.toLowerCase()} href={s.link} target="_blank" rel="noopener noreferrer">
            {s.icon ? s.icon : ""}
          </a>
        </li>
      ))}
    </SocialsStyled>
  )
}

const SocialsStyled = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  > li > a {
    width: 2.5rem;
    height: 2.5rem;
    display: grid;
    place-items: center;
    font-size: var(--fs6);
    background-color: var(--underlay1);
    border-radius: 50%;
    transition: var(--transition1);

    &#x {
      color: var(--primaryColor);
    }

    &#x:hover {
      color: #fff;
      background-color: var(--underlay2);
    }

    &#discord {
      color: var(--primaryColor);
    }

    &#discord:hover {
      color: #fff;
      background-color: var(--colorDiscord);
    }
  }
`

export default Socials
