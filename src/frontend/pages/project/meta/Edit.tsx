import React, { FC } from "react"
import styled from "styled-components"

const Edit: FC = (): JSX.Element => {
  return (
    <EditStyled
      href="https://twitter.com/messages/compose?recipient_id=1386304698358116354"
      rel="noreferrer noopener"
      target="_blank"
    >
      Edit project
    </EditStyled>
  )
}

const EditStyled = styled.a`
  display: inline-block;
  padding: 0.5rem 0;

  &:hover {
    box-shadow: 0 2px 0 var(--primaryColor);
  }
`

export default Edit
