import React, { FC } from "react"
import styled from "styled-components"

// components
import { Title } from "./_index"

const Header: FC = (): JSX.Element => {
  return (
    <HeaderStyled>
      <Title />
      <p>discover new #ic projects</p>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  > p {
    color: var(--secondaryColor);
  }
`

export default Header
