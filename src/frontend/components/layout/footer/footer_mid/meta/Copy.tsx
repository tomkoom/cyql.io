import React, { FC } from "react"
import styled from "styled-components"

const Copy: FC = (): JSX.Element => {
  const d = new Date()
  let year = d.getFullYear()

  return <CopyStyled>{year.toString()} cyql</CopyStyled>
}

const CopyStyled = styled.p`
  font-size: var(--fs7);
  color: var(--secondaryColor);
`

export default Copy
