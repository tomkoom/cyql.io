import React, { FC } from "react"
import styled from "styled-components"
import { Badge, Copy } from "./_index"

const Meta: FC = (): JSX.Element => {
  return (
    <MetaStyled>
      <Badge />
      <Copy />
    </MetaStyled>
  )
}

const MetaStyled = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.5rem;
`

export default Meta
