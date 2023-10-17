import React, { FC } from "react"
import styled from "styled-components"

// icons
import { iGithub, iCircleNodes } from "@/components/icons/Icons"

interface MainProps {
  name: string
  category: string[]
  canister: string
  github: string
  description: string
}

const Main: FC<MainProps> = ({ name, category, canister, github, description }): JSX.Element => {
  const formatName = (name: string): string => {
    return name.length > 40 ? `${name.substring(0, 40)}…` : name
  }

  const formatDescription = (description: string): string => {
    return description.length > 40 ? `${description.substring(0, 40)}…` : description
  }

  return (
    <MainStyled>
      <h3>{formatName(name)}</h3>
      <Tags>
        {category.length > 0 && category.join(", ")}{" "}
        {canister && <span>{iCircleNodes} onchain</span>} {github && <span>{iGithub} open</span>}
      </Tags>

      <Description>{formatDescription(description)}</Description>
    </MainStyled>
  )
}

const MainStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  > h3 {
    font-size: var(--fs6);
    font-weight: var(--fwBold);
    margin-top: 0.1rem;
    word-wrap: break-word;
  }
`

const Tags = styled.span`
  font-size: var(--text);
  font-weight: var(--fwMedium);
  color: var(--secondaryColor);
  text-transform: lowercase;
`

const Description = styled.p`
  font-size: var(--text);
  font-weight: var(--fwMedium);
  color: var(--tertiaryColor);
`

export default Main
