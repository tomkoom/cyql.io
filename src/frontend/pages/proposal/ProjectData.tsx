import type { ListProjectData } from "@/state/types/dao_types"
import React, { FC } from "react"
import styled from "styled-components"
import { DataItem } from "./_index"

interface ProjectDataProps {
  project: ListProjectData
}

const ProjectData: FC<ProjectDataProps> = ({ project }): JSX.Element => {
  return (
    <ProjectDataStyled>
      {Object.entries(project).map(([key, value], i) => (
        <DataItem
          key={key}
          label={key}
          value={Array.isArray(value) ? value.join(", ").toUpperCase() : value}
          isLast={Object.entries(project).length - 1 === i}
        />
      ))}
    </ProjectDataStyled>
  )
}

const ProjectDataStyled = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export default ProjectData
