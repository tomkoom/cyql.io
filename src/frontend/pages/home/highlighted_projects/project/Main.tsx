import React, { FC } from "react"
import styled from "styled-components"
import type { Project } from "@/state/_types/curated_projects_types"
import { iGithub, iCircleNodes } from "@/components/icons/Icons"
import { UpvotesNum } from "@/components/ui/_index"

interface MainProps {
  project: Project
}

const Main: FC<MainProps> = ({ project }): JSX.Element => {
  const { name, upvotedBy, category, frontendCanisterId, github, description } = project
  const upvotesNum = upvotedBy.length

  const formatName = (s: string): string => {
    return s.length > 40 ? `${s.substring(0, 40)}…` : s
  }

  const formatDescription = (s: string): string => {
    return s.length > 40 ? `${s.substring(0, 40)}…` : s
  }

  return (
    <MainStyled>
      <div className="title">
        <h4>{formatName(name)}</h4> <UpvotesNum upvotesNum={upvotesNum} />
      </div>

      <div className="tags">
        {category.length > 0 && category.join(", ")}{" "}
        {frontendCanisterId && <span>{iCircleNodes} onchain</span>}{" "}
        {github && <span>{iGithub} open</span>}
      </div>

      <p className="description">{formatDescription(description)}</p>
    </MainStyled>
  )
}

const MainStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;

  > div.title {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;

    > h4 {
      font-size: var(--fs6);
      font-weight: var(--fwBold);
      margin-top: 0.1rem;
      word-wrap: break-word;
      line-height: 125%;
    }
  }

  > div.tags {
    font-size: var(--text);
    font-weight: var(--fwMedium);
    color: var(--secondaryColor);
    text-transform: lowercase;
    line-height: 125%;
  }

  > p.description {
    font-size: var(--text);
    font-weight: var(--fwMedium);
    color: var(--tertiaryColor);
    line-height: 125%;
  }
`

export default Main
