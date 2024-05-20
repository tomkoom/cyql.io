import React, { FC } from "react"
import styled from "styled-components"
import { Name, Tags } from "./_index"
import { ProjectV2 } from "@/state/_types/curated_projects_types"

interface TitleProps {
  project: ProjectV2
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
