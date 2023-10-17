import React, { FC } from "react"
import styled from "styled-components"

interface TagsProps {
  category: string[]
}

const Tags: FC<TagsProps> = ({ category }): JSX.Element => {
  return (
    <TagsStyled>
      {category.length > 0 &&
        category.map((category) => <li key={category.toLowerCase()}>{category.toLowerCase()}</li>)}
    </TagsStyled>
  )
}

const TagsStyled = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  align-items: center;

  > li {
    height: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 0.5rem;
    font-size: var(--fsText);
    background-color: var(--underlay1);
    border-radius: 0.5rem;
  }
`

export default Tags
