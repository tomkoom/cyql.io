import React, { FC } from "react"
import styled from "styled-components"
import { Name, Tags } from "./_index"
import { Project } from "@/state/_types/curated_projects_types"

interface TitleProps {
  project: Project
}

const Title: FC<TitleProps> = ({ project }) => {
  return (
    <TitleStyled>
      <Name name={project.name} />
      <Tags project={project} />
    </TitleStyled>
  )
}

const TitleStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export default Title
