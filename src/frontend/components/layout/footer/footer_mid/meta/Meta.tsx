import React, { FC } from "react"
import styled from "styled-components"
import { Badge, Copy, Onchain } from "./_index"

const Meta: FC = (): JSX.Element => {
  return (
    <MetaStyled>
      <Badge />
      <Onchain />
      <Copy />
    </MetaStyled>
  )
}

const MetaStyled = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.25rem;
`

export default Meta
