import React, { FC } from "react"
import styled from "styled-components"
import { iGithub, iCircleNodes } from "@/components/icons/Icons"
import { Project } from "@/state/_types/curated_projects_types"

interface TagsProps {
  project: Project
}

const Tags: FC<TagsProps> = ({ project }) => {
  return (
    <TagsStyled>
      {/* category */}
      {project.category.length > 0 && project.category.map((category) => <li key={category.toLowerCase()}>{category.toLowerCase()}</li>)}

      {/* tags */}
      {project.github && <li id="open">{iGithub} Open-Source</li>}
      {project.frontendCanisterId && <li id="onchain">{iCircleNodes} On-Chain</li>}
    </TagsStyled>
  )
}

const TagsStyled = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;

  > li {
    height: 2rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: var(--fsText);
    font-weight: var(--fwMedium);
    background-color: var(--underlay1);
    padding: 0 0.5rem;

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
