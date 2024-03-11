import React, { FC } from "react"
import styled from "styled-components"

const ProjectProposals: FC = (): JSX.Element => {
  return (
    <ProjectProposalsStyled>
      <h2 className="pageTitle">Proposed Projects</h2>
      <p>...</p>
    </ProjectProposalsStyled>
  )
}

const ProjectProposalsStyled = styled.div`
  text-align: center;
`

export default ProjectProposals
