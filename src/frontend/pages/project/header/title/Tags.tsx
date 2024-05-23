import React, { FC } from "react"
import styled from "styled-components"
import { iGithub, iCircleNodes } from "@/components/icons/Icons"
import { ProjectV2 } from "@/state/_types/curated_projects_types"

interface TagsProps {
  project: ProjectV2
}

const Tags: FC<TagsProps> = ({ project }) => {
  return (
    <TagsStyled>
      {project.category.length > 0 &&
        project.category.map((category) => (
          <li key={category.toLowerCase()}>{category.toLowerCase()}</li>
        ))}

      {project.github && <li id="open">{iGithub} open</li>}
      {project.frontendCanisterId && <li id="onchain">{iCircleNodes} onchain</li>}
    </TagsStyled>
  )
}

const TagsStyled = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  > li {
    height: 2.5rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: var(--fs6);
    font-weight: var(--fwBold);
    background-color: var(--underlay1);
    padding: 0 0.75rem;
    border-radius: 1.25rem;

    &#open {
      color: var(--primaryColor);
      background-color: var(--underlay1);
    }

    &#onchain {
      color: #fff;
      background-color: var(--highlight3);
    }
  }
`

export default Tags
