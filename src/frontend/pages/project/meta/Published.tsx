import React, { FC } from "react"
import styled from "styled-components"
import { formatDateTime } from "@/utils/_index"

interface PublishedProps {
  createdAt: string
}

const Published: FC<PublishedProps> = ({ createdAt }): JSX.Element => {
  if (!createdAt) return null
  return <PublishedStyled>Published {formatDateTime(Number(createdAt))}</PublishedStyled>
}

const PublishedStyled = styled.div`
  color: var(--tertiaryColor);
`

export default Published
