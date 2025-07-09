import { LogoLetter } from "@/components/ui"
import { FC } from "react"
import styled from "styled-components"

interface LogoProps {
  name: string
  logo: string
}

const Logo: FC<LogoProps> = ({ name, logo }): JSX.Element => {
  const size = "4.5rem"
  const borderRadius = "2.25rem"
  const style = {
    width: size,
    height: size,
    borderRadius: borderRadius,
  }

  return logo ? <LogoStyled style={style} src={logo} alt={`${name} logo`} /> : <LogoLetter size={size} borderRadius={borderRadius} name={name} />
}

const LogoStyled = styled.img`
  flex-shrink: 0;
  object-fit: cover;
`

export default Logo
