import styled from "styled-components"

interface LogoLetterProps {
  size: string
  name: string
}

export default function ProjectLogoLetter({ size, name }: LogoLetterProps) {
  const firstLetter = name.charAt(0)
  const style = {
    width: size,
    height: size,
    borderRadius: "100%",
  }

  return <LogoLetterStyled style={style}>{firstLetter}</LogoLetterStyled>
}

const LogoLetterStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: var(--fs4);
  font-weight: var(--fwBlack);
  color: var(--tertiaryColor);
  background-color: var(--underlay1);
`
