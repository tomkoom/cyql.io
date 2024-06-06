import React, { FC } from "react"
import styled from "styled-components"
import type { Project } from "@/state/_types/curated_projects_types"
import { iGithub, iCircleNodes } from "@/components/icons/Icons"
import { UpvotesNum } from "@/components/ui/_index"
import { trimDescription, trimName } from "@/utils/_index"

interface MainProps {
  project: Project
}

const Main: FC<MainProps> = ({ project }): JSX.Element => {
  const { name, upvotedBy, category, frontendCanisterId, github, description } = project
  const upvotesNum = upvotedBy.length

  return (
    <MainStyled>
      <div className="title">
        <h4>{trimName(name)}</h4> <UpvotesNum upvotesNum={upvotesNum} />
      </div>

      <div className="category_tags">
        <ul className="category">
          {category.map((c) => (
            <li key={c}>{c.toLocaleLowerCase()}</li>
          ))}
        </ul>

        {(frontendCanisterId || github) && (
          <ul className="tags">
            {frontendCanisterId && <li>{iCircleNodes} onchain</li>}
            {github && <li>{iGithub} open</li>}
          </ul>
        )}
      </div>

      <p className="description">{trimDescription(description)}</p>
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

  > div.category_tags {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    flex-wrap: wrap;

    > ul.category {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      flex-wrap: wrap;

      > li {
        font-size: var(--fs7);
        font-weight: var(--fwMedium);
        color: var(--secondaryColor);
        text-transform: lowercase;
        line-height: 125%;
        padding: 0.125rem 0.25rem;
        background-color: var(--underlay2);
      }
    }

    > ul.tags {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      flex-wrap: wrap;

      > li {
        font-size: var(--fs7);
        font-weight: var(--fwMedium);
        color: var(--secondaryColor);
        text-transform: lowercase;
        line-height: 125%;
      }
    }
  }

  > p.description {
    font-size: var(--text);
    font-weight: var(--fwMedium);
    color: var(--tertiaryColor);
    line-height: 125%;
  }
`

export default Main
