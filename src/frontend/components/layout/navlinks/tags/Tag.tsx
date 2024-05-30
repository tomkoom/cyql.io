import React, { FC } from "react"
import styled from "styled-components"
import { iHashtag } from "@/components/icons/Icons"

interface TagProps {
  label: string
  size: number
  route: () => void
}

const Tag: FC<TagProps> = ({ label, size, route }): JSX.Element => {
  return (
    <TagStyled onClick={route}>
      <span className="icon">{iHashtag}</span>
      <span className="label">
        {label} <span className="num">{size ? size.toString() : ""}</span>
      </span>
    </TagStyled>
  )
}

const TagStyled = styled.li`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: 2rem;
  padding: 0 0.5rem;
  font-size: var(--fsText);
  font-weight: var(--fwRegular);
  color: var(--tertiaryColor);
  background-color: var(--underlay1);
  cursor: pointer;
  transition: var(--transition1);

  &:hover {
    color: var(--primaryColor);
    background-color: var(--underlay2);
  }

  > span.icon {
    font-size: 0.8rem;
    color: var(--highlight3);
  }

  > span.label {
    white-space: nowrap;

    > span.num {
      color: var(--tertiaryColor);
      font-size: 0.7rem;
    }
  }
`

export default Tag
