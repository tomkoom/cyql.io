import React, { FC } from "react"
import styled from "styled-components"
import { iAngleDown, iSort } from "@/components/icons/Icons"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectSort } from "@/state/projects/sort"

const SortBtn: FC = (): JSX.Element => {
  const sort = useAppSelector(selectSort)

  return (
    <SortBtnStyled>
      <span className="icon">{iSort}</span>
      <span>Order by:</span>
      <span className="selected">
        {sort === "newest-first"
          ? "newest first"
          : sort === "oldest-first"
          ? "oldest first"
          : sort === "most-upvoted"
          ? "most upvoted"
          : sort === "least-upvoted"
          ? "least upvoted"
          : null}
      </span>
      <span className="icon">{iAngleDown}</span>
    </SortBtnStyled>
  )
}

const SortBtnStyled = styled.div`
  height: 2.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0 1rem;
  font-size: var(--fsText);
  font-weight: var(--fwMedium);
  color: var(--secondaryColor);
  background-color: var(--underlay1);
  cursor: pointer;
  transition: var(--transition1);

  &:hover {
    background-color: var(--underlay2);
  }

  > span.selected {
    color: var(--primaryColor);
  }

  > span.icon {
    color: var(--tertiaryColor);
  }
`

export default SortBtn
