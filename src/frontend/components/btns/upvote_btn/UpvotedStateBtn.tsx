import React, { FC } from "react"
import styled from "styled-components"
import { iCaretUp } from "@/components/icons/Icons"

interface UpvotedStateBtnProps {
  upvotesNum: number
  click: () => void
}

const UpvotedStateBtn: FC<UpvotedStateBtnProps> = ({ upvotesNum, click }): JSX.Element => {
  return (
    <UpvotedStateBtnStyled onClick={click}>
      <span className="icon">{iCaretUp}</span>
      <span className="num">{upvotesNum}</span>
    </UpvotedStateBtnStyled>
  )
}

const UpvotedStateBtnStyled = styled.button`
  width: 2.5rem;
  height: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: var(--fs7);
  color: var(--highlight1);
  background-color: rgba(var(--highlightColor3Rgb), 0.1);
  font-weight: var(--fwBold);
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(var(--highlightColor3Rgb), 0.2);
  }

  > span.icon {
    color: var(--highlight3);
  }

  > span.num {
    color: var(--highlight3);
    margin-top: -0.25rem;
    padding-bottom: 0.25rem;
  }
`

export default UpvotedStateBtn
