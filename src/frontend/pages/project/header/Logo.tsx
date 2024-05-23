import React, { FC } from "react"
import styled from "styled-components"
import { LogoLetter } from "@/components/ui/_index"

interface LogoProps {
  logo: string
  name: string
}

const Logo: FC<LogoProps> = ({ logo, name }) => {
  const sizeRem = "6rem"
  const borderRadiusRem = "3rem"

  return (
    <div>
      {logo ? (
        <LogoStyled
          sizeRem={sizeRem}
          borderRadiusRem={borderRadiusRem}
          src={logo}
          alt={`${name} logo`}
        />
      ) : (
        <LogoLetter sizeRem={sizeRem} borderRadiusRem={borderRadiusRem} name={name} />
      )}
    </div>
  )
}

const LogoStyled = styled.img<{ sizeRem: string; borderRadiusRem: string }>`
  width: ${(p) => p.sizeRem};
  height: ${(p) => p.sizeRem};
  border-radius: ${(p) => p.borderRadiusRem};
  flex-shrink: 0;
  object-fit: cover;
`

export default Logo
