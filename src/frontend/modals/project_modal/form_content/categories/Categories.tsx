import React, { FC } from "react"
import styled from "styled-components"
import { CategoryList } from "./_index"

const Categories: FC = (): JSX.Element => {
  return (
    <div>
      <Title>
        category <span>one or multiple</span>
      </Title>
      <CategoryList />
    </div>
  )
}

const Title = styled.h6`
  font-weight: var(--fwMedium);
  margin-bottom: 1rem;

  > span {
    font-weight: var(--fwMedium);
    color: var(--tertiaryColor);
  }
`

export default Categories
