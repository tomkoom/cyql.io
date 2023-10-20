import React, { FC } from "react"
import styled from "styled-components"
import { iCaretUp } from "@/components/icons/Icons"

interface DefaultBtnProps {
  upvotesNum: number
  click: () => void
}

const DefaultBtn: FC<DefaultBtnProps> = ({ upvotesNum, click }) => {
  return (
    <DefaultBtnStyled onClick={click}>
      <span className="icon">{iCaretUp}</span>
      <span className="num">{upvotesNum}</span>
    </DefaultBtnStyled>
  )
}

const DefaultBtnStyled = styled.button`
  height: 3.5rem;
  width: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: var(--fs7);
  color: var(--secondaryColor);
  background-color: var(--underlay1);
  font-weight: var(--fwBold);
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--underlay2);
  }

  > span.icon {
    color: var(--secondaryColor);
    font-size: var(--fs5);
  }

  > span.num {
    margin-top: -0.25rem;
    padding-bottom: 0.25rem;
  }
`

export default DefaultBtn
