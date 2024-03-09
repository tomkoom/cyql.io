import React, { FC } from "react"
import styled from "styled-components"

const Token: FC = (): JSX.Element => {
  return (
    <TokenStyled>
      <div className="title">
        <h5>2. Token</h5>
        <p>
          Please specify the ledger canister id and a token standard if the project is tokenized
        </p>
      </div>
    </TokenStyled>
  )
}

const TokenStyled = styled.div`
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

export default Token
