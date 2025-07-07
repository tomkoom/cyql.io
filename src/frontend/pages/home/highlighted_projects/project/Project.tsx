import React, { FC } from "react"
import styled from "styled-components"
import type { Project as P } from "@/state/_types/curated_projects_types"
import { useNav } from "@/hooks"
import { Logo, Main } from "./_index"

interface ProjectProps {
  project: P
}

const Project: FC<ProjectProps> = ({ project }): JSX.Element => {
  const { toProject } = useNav()

  const openProject = (id: string): void => {
    toProject(id)
  }

  return (
    <ProjectStyled onClick={() => openProject(project.id)}>
      <Logo name={project.name} logo={project.logoDataUrl} />
      <Main project={project} />
    </ProjectStyled>
  )
}

const ProjectStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`

export default Project
