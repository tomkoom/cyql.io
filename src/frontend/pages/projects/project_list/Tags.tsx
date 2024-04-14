import React, { FC } from "react"
import styled from "styled-components"

interface TagsProps {
  category: string[]
}

const Tags: FC<TagsProps> = ({ category }): JSX.Element => {
  if (category.length < 1) return null

  return (
    <TagsStyled>
      {category.map((category) => (
        <li key={category.toLowerCase()}>{category.toLowerCase()}</li>
      ))}
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
    font-size: 0.8rem;
    background-color: var(--underlay1);
  }
`

export default Tags
