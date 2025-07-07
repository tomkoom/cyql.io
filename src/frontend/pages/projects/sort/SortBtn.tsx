import React, { FC } from "react"
import styled from "styled-components"
import { iAngleDown, iSort } from "@/components/icons/Icons"
import { useQueryParams } from "@/hooks"

const SortBtn: FC = (): JSX.Element => {
  const { queryParams } = useQueryParams()
  const { sort } = queryParams

  return (
    <SortBtnStyled>
      <span className="icon">{iSort}</span>
      <span>Order by:</span>
      <span className="selected">
        {Object.keys(sort)[0] === "newest_first"
          ? "newest first"
          : Object.keys(sort)[0] === "oldest_first"
          ? "oldest first"
          : Object.keys(sort)[0] === "most_upvoted"
          ? "most upvoted"
          : Object.keys(sort)[0] === "least_upvoted"
          ? "least upvoted"
          : Object.keys(sort)[0] === "recently_updated"
          ? "Recently updated"
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
