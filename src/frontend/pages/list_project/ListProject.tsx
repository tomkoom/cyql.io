import React, { FC } from "react"
import styled from "styled-components"

const ListProject: FC = (): JSX.Element => {
  return (
    <ListProjectStyled>
      <p>Listing is under dev and will be available soon. Thank you for following!</p>
    </ListProjectStyled>
  )
}

const ListProjectStyled = styled.div`
  > p {
    text-align: center;
  }
`

export default ListProject
