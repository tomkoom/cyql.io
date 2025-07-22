import { iArrowUp } from "@/components/icons/Icons"
import styled from "styled-components"

interface UpvotesNumProps {
  upvotesNum: number
}

export default function UpvotesNum({ upvotesNum }: UpvotesNumProps) {
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
