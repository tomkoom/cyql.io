import React, { FC } from "react"
import styled from "styled-components"
import { ProjectData } from "./_index"

const ListProject: FC = (): JSX.Element => {
  return (
    <ListProjectStyled>
      <h2 className="pageTitle">List New #ic Project</h2>
      <div className="content">
        <p>The project will be listed as a proposal and will be moderated by the community.</p>
        <p>Under dev.</p>
      </div>

      <div>
        <ProjectData />
      </div>
    </ListProjectStyled>
  )
}

const ListProjectStyled = styled.div`
  > div.content {
    > p {
      text-align: center;
    }
  }
`

export default ListProject
