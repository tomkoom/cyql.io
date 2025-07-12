import type { Project } from "@/state/types/curated_projects_types"
import React, { FC } from "react"
import styled from "styled-components"
import { Edit, Published, Updated } from "./_index"

interface MetaProps {
  project: Project
}

const Meta: FC<MetaProps> = ({ project }): JSX.Element => {
  return (
    <MetaStyled>
      <Published createdAt={project.createdAt} />
      <Updated updatedAt={project.updatedAt} />
      <Edit />
    </MetaStyled>
  )
}

const MetaStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin: 1rem 0;
  font-size: var(--fsText);
`

export default Meta
