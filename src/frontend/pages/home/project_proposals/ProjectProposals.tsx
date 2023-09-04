import React, { FC } from "react"
import styled from "styled-components"

// components
import { Btn } from "@/components/btns/_index"

const ProjectProposals: FC = (): JSX.Element => {
  return (
    <ProjectProposalsStyled>
      <Header>
        <h3 className="sectionTitle">project proposals</h3>
        <Btn btnType="secondary" text="add project" onClick={() => console.log("propose")} />
      </Header>

      {/* list */}
      <List>
        <li></li>
      </List>
    </ProjectProposalsStyled>
  )
}

const ProjectProposalsStyled = styled.div`
  margin-bottom: 2rem;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
`

const List = styled.ul``

export default ProjectProposals
