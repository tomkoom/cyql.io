import { LogoLetter } from "@/components/ui"
import React, { FC } from "react"
import styled from "styled-components"

interface LogoProps {
  logo: string
  name: string
}

const Logo: FC<LogoProps> = ({ logo, name }) => {
  const size = "6rem"
  const borderRadius = "3rem"

  return (
    <div>
      {logo ? (
        <LogoStyled size={size} borderRadius={borderRadius} src={logo} alt={`${name} logo`} />
      ) : (
        <LogoLetter size={size} borderRadius={borderRadius} name={name} />
      )}
    </div>
  )
}

const LogoStyled = styled.img<{ size: string; borderRadius: string }>`
  width: ${(p) => p.size};
  height: ${(p) => p.size};
  border-radius: ${(p) => p.borderRadius};
  flex-shrink: 0;
  object-fit: cover;
`

export default Logo
