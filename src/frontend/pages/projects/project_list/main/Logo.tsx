import React, { FC } from "react"
import styled from "styled-components"
import { LogoLetter } from "@/components/ui/_index"

interface LogoProps {
  name: string
  logo: string
}

const Logo: FC<LogoProps> = ({ name, logo }): JSX.Element => {
  const sizeRem = "4.25rem"
  const borderRadiusRem = "1rem"

  if (logo) {
    return (
      <LogoStyled
        sizeRem={sizeRem}
        borderRadiusRem={borderRadiusRem}
        src={logo}
        alt={`${name} logo`}
      />
    )
  }

  return <LogoLetter sizeRem={sizeRem} borderRadiusRem={borderRadiusRem} name={name} />
}

const LogoStyled = styled.img<{ sizeRem: string; borderRadiusRem: string }>`
  width: ${(p) => p.sizeRem};
  height: ${(p) => p.sizeRem};
  border-radius: ${(p) => p.borderRadiusRem};
  flex-shrink: 0;
  object-fit: cover;
`

export default Logo
