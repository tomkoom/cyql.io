import React, { FC } from "react"
import styled from "styled-components"
import { iArrowUp } from "@/components/icons/Icons"

interface UpvotesNumProps {
  upvotesNum: number
}

const UpvotesNum: FC<UpvotesNumProps> = ({ upvotesNum }) => {
  if (upvotesNum < 1) return null

  return (
    <UpvotesNumStyled>
      {iArrowUp} {upvotesNum.toString()}
    </UpvotesNumStyled>
  )
}

const UpvotesNumStyled = styled.span`
  white-space: nowrap;
  font-size: var(--fs7);
  color: var(--colorOk);
`

export default UpvotesNum
