import React, { FC } from "react"
import styled from "styled-components"

const Primary: FC = (): JSX.Element => {
  return (
    <PrimaryStyled>
      <div>content</div>
    </PrimaryStyled>
  )
}

const PrimaryStyled = styled.div`
  text-align: center;

  > div.title {
    h5 {
      margin-bottom: 0.25rem;
    }

    p {
      color: var(--secondaryColor);
    }
  }
`

export default Primary
