import React, { FC } from "react"
import styled from "styled-components"
import { iCaretUp, iCheck } from "@/components/icons/Icons"

interface UpvotedStateBtnProps {
  upvotesNum: number
  click: () => void
}

const UpvotedStateBtn: FC<UpvotedStateBtnProps> = ({ upvotesNum, click }): JSX.Element => {
  return (
    <UpvotedStateBtnStyled onClick={click}>
      <span className="icon">{iCaretUp}</span>
      <span className="num">
        {upvotesNum} {iCheck}
      </span>
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
  background-color: var(--underlay2);
  font-weight: var(--fwBold);
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: var(--transition1);

  &:hover {
    background-color: var(--underlay3);
  }

  > span.icon {
    color: var(--primaryColor);
  }

  > span.num {
    color: var(--primaryColor);
    margin-top: -0.25rem;
    padding-bottom: 0.25rem;
  }
`

export default UpvotedStateBtn
