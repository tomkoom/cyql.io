import React, { FC } from "react"
import styled from "styled-components"

const ListProject: FC = (): JSX.Element => {
  return (
    <ListProjectStyled>
      <h2 className="pageTitle">list new ic project</h2>
      <div className="content">
        <p>Submit new project through a proposal.</p>
        <p>Listing is under dev and will be available soon. Thank you for following!</p>
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
