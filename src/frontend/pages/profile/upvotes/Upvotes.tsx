import React, { FC } from "react"
import styled from "styled-components"

const Upvotes: FC = (): JSX.Element => {
  return (
    <UpvotesStyled>
      <h4>Upvotes</h4>
      <p>...</p>
    </UpvotesStyled>
  )
}

const UpvotesStyled = styled.div`
  > h4 {
    margin-bottom: 1rem;
  }
`

export default Upvotes
