import React, { FC } from "react"
import styled from "styled-components"

const Token: FC = (): JSX.Element => {
  return (
    <TokenStyled>
      <div className="title">content</div>
    </TokenStyled>
  )
}

const TokenStyled = styled.div``

export default Token
