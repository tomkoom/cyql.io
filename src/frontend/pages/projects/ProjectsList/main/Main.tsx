import type { Project } from "@/state/types/Project"
import React, { FC } from "react"
import styled from "styled-components"
import { Logo, Title } from "./_index"

interface MainProps {
  project: Project
}

const Main: FC<MainProps> = ({ project }): JSX.Element => {
  return (
    <MainStyled>
      <Logo project={project} />
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
