import React, { FC } from "react"
import styled from "styled-components"
import { X_DIRECT_MSG_URL } from "@/constants/constants"

const Edit: FC = (): JSX.Element => {
  return (
    <EditStyled href={X_DIRECT_MSG_URL} target="_blank" rel="noreferrer noopener">
      Edit project
    </EditStyled>
  )
}

const EditStyled = styled.a`
  transition: var(--transition1);
  &:hover {
    box-shadow: 0 2px 0 var(--primaryColor);
  }
`

export default Edit
