import React, { FC } from "react"
import styled from "styled-components"
import { iCaretUp, iCheck } from "@/components/icons/Icons"

interface UpvotedStateBtnProps {
  upvotesNum: number
  location: string
  click: () => void
}

const UpvotedStateBtn: FC<UpvotedStateBtnProps> = ({
  upvotesNum,
  location,
  click,
}): JSX.Element => {
  return (
    <UpvotedStateBtnStyled location={location} onClick={click}>
      <span className="icon">{iCaretUp}</span>
      <span className="num">
        {upvotesNum} {iCheck}
      </span>
    </UpvotedStateBtnStyled>
  )
}

const UpvotedStateBtnStyled = styled.button<{ location: string }>`
  width: ${(p) => (p.location === "project_page" ? "3.5rem" : "2.5rem")};
  height: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: var(--fs7);
  background-color: var(--underlay2);
  font-weight: var(--fwBold);
  border-radius: ${(p) => (p.location === "project_page" ? "50%" : "0.6rem")};
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
