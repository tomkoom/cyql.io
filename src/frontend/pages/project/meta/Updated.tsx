import React, { FC } from "react"
import styled from "styled-components"
import { formatDateTime } from "@/utils/_index"

interface UpdatedProps {
  updatedAt: string
}

const Updated: FC<UpdatedProps> = ({ updatedAt }): JSX.Element => {
  if (!updatedAt) return null
  return <UpdatedStyled>Updated {formatDateTime(Number(updatedAt))}</UpdatedStyled>
}

const UpdatedStyled = styled.div`
  color: var(--tertiaryColor);
`

export default Updated
