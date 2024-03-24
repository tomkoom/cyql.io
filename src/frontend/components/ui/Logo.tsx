import React, { FC, HTMLAttributes } from "react"
import styled from "styled-components"
import { LOGO_COLOR, LOGO_GRAY } from "@/constants/constants"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectTheme } from "@/state/theme"

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  onClick?: () => void
}

const Logo: FC<LogoProps> = ({ onClick }): JSX.Element => {
  const theme = useAppSelector(selectTheme)

  return (
    <LogoStyled onClick={onClick}>
      <img
        src={theme === "light" ? LOGO_COLOR : theme === "dark" ? LOGO_GRAY : null}
        alt="cyql.io logo"
      />
      <h1>cyql</h1>
    </LogoStyled>
  )
}

const LogoStyled = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: var(--transition1);

  &:hover {
    opacity: 0.6;
  }

  > img {
    height: 1.77rem;
  }

  > h1 {
    visibility: hidden;
    width: 0;
  }
`

export default Logo
