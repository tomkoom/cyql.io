import { LogoLetter } from "@/components/ui"
import React, { FC } from "react"
import styled from "styled-components"

interface LogoProps {
  name: string
  logo: string
}

const Logo: FC<LogoProps> = ({ name, logo }): JSX.Element => {
  const size = "4.25rem"
  const borderRadius = "2.125rem"

  if (logo) {
    return <LogoStyled size={size} borderRadius={borderRadius} src={logo} alt={`${name} logo`} />
  }

  return <LogoLetter size={size} borderRadius={borderRadius} name={name} />
}

const LogoStyled = styled.img<{ size: string; borderRadius: string }>`
  width: ${(p) => p.size};
  height: ${(p) => p.size};
  border-radius: ${(p) => p.borderRadius};
  flex-shrink: 0;
  object-fit: cover;
`

export default Logo
