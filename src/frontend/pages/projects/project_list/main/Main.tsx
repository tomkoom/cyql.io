import React, { FC } from "react"
import styled from "styled-components"
import { Logo, Title } from "./_index"
import type { ProjectV2 } from "@/state/_types/curated_projects_types"

interface MainProps {
  project: ProjectV2
}

const Main: FC<MainProps> = ({ project }): JSX.Element => {
  return (
    <MainStyled>
      <Logo logo={project.logoUrl} name={project.name} />
      <Title project={project} />
    </MainStyled>
  )
}

const MainStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export default Main
