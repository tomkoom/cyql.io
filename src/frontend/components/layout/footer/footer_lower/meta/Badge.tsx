import React, { FC } from "react"
import styled from "styled-components"
import { IC_LOGO } from "@/constants/constants"

const Badge: FC = (): JSX.Element => {
  return (
    <BadgeStyled>
      Powered by{" "}
      <a href="https://internetcomputer.org/" target="_blank" rel="noreferrer noopener">
        <img src={IC_LOGO} alt="Internet Computer logo" />
        Internet Computer
      </a>
    </BadgeStyled>
  )
}

const BadgeStyled = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--fs7);
  color: var(--secondaryColor);

  > a {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    > img {
      max-width: 1.25rem;
    }
  }
`

export default Badge
