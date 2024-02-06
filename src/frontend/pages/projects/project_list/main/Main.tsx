import React, { FC } from "react"
import styled from "styled-components"
import { Logo, Title } from "./_index"
import type { Project } from "@/state/_types/types"

interface MainProps {
  project: Project
}

const Main: FC<MainProps> = ({ project }): JSX.Element => {
  return (
    <MainStyled>
      <Logo logo={project.logo} name={project.name} />
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
