import React, { FC } from "react"
import styled from "styled-components"
import { formatDate } from "@/utils/formatDate"

interface PublishedProps {
  createdAt: string
}

const Published: FC<PublishedProps> = ({ createdAt }): JSX.Element => {
  if (!createdAt) {
    return null
  }

  return <PublishedStyled>Published {formatDate(createdAt)}</PublishedStyled>
}

const PublishedStyled = styled.div`
  white-space: nowrap;
  color: var(--tertiaryColor);
`

export default Published
