import React, { FC } from "react"
import styled from "styled-components"
import { Edit, Published } from "./_index"

interface MetaProps {
  createdAt: string
}

const Meta: FC<MetaProps> = ({ createdAt }): JSX.Element => {
  return (
    <MetaStyled>
      <Published createdAt={createdAt} />
      <Edit />
    </MetaStyled>
  )
}

const MetaStyled = styled.div`
  margin: 1rem 0;
  font-size: var(--fsText);
`

export default Meta
