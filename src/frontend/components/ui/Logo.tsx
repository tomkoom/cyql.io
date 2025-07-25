import { APP_NAME_TLD, LOGO_COLOR, LOGO_GRAY } from "@/constants/constants"
import { useAppSelector } from "@/hooks/useRedux"
import { selectTheme } from "@/state/theme"
import { HTMLAttributes } from "react"
import styled from "styled-components"

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  onClick?: () => void
}

export default function Logo({ onClick }: LogoProps) {
  const theme = useAppSelector(selectTheme)

  return (
    <LogoStyled onClick={onClick}>
      <img src={theme === "light" ? LOGO_COLOR : theme === "dark" ? LOGO_GRAY : null} alt={`${APP_NAME_TLD} logo`} />
      <h1>{APP_NAME_TLD}</h1>
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
