import React, { FC } from "react"
import styled from "styled-components"
import type { ProjectProposalData } from "@/state/_types/dao_types"
import { DataItem } from "./_index"

interface ProjectDataProps {
  project: ProjectProposalData
}

const ProjectData: FC<ProjectDataProps> = ({ project }): JSX.Element => {
  return (
    <ProjectDataStyled>
      {Object.entries(project).map(([key, value]) => (
        <DataItem
          key={key}
          label={key}
          value={Array.isArray(value) ? value.join().toUpperCase() : value}
        />
      ))}
    </ProjectDataStyled>
  )
}

const ProjectDataStyled = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
`

export default ProjectData
