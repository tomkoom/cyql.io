import React, { FC } from "react"
import styled from "styled-components"

const Copy: FC = (): JSX.Element => {
  return <CopyStyled>© {new Date().getFullYear().toString()} cyql</CopyStyled>
}

const CopyStyled = styled.p`
  font-size: var(--fs7);
  color: var(--secondaryColor);
`

export default Copy
