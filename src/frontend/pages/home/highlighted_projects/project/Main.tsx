import React, { FC } from "react"
import styled from "styled-components"
import type { ProjectV2 } from "@/state/_types/curated_projects_types"
import { iGithub, iCircleNodes } from "@/components/icons/Icons"
import { UpvotesNum } from "@/components/ui/_index"

interface MainProps {
  project: ProjectV2
}

const Main: FC<MainProps> = ({ project }): JSX.Element => {
  const upvotesNum = project.upvotedBy.length
  const formatName = (name: string): string => {
    return name.length > 40 ? `${name.substring(0, 40)}…` : name
  }

  const formatDescription = (description: string): string => {
    return description.length > 40 ? `${description.substring(0, 40)}…` : description
  }

  return (
    <MainStyled>
      <Title>
        <h4>{formatName(project.name)}</h4> <UpvotesNum upvotesNum={upvotesNum} />
      </Title>

      <Tags>
        {project.category.length > 0 && project.category.join(", ")}{" "}
        {project.frontendCanisterId && <span>{iCircleNodes} onchain</span>}{" "}
        {project.github && <span>{iGithub} open</span>}
      </Tags>

      <Description>{formatDescription(project.description)}</Description>
    </MainStyled>
  )
}

const MainStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const Title = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;

  > h4 {
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
