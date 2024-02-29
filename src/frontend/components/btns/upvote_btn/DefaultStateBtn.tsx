import React, { FC } from "react"
import styled from "styled-components"
import { iCaretUp } from "@/components/icons/Icons"

interface DefaultBtnProps {
  upvotesNum: number
  location: string
  click: () => void
}

const DefaultBtn: FC<DefaultBtnProps> = ({ upvotesNum, location, click }) => {
  return (
    <DefaultBtnStyled location={location} onClick={click}>
      <span className="icon">{iCaretUp}</span>
      <span className="num">{upvotesNum}</span>
    </DefaultBtnStyled>
  )
}

const DefaultBtnStyled = styled.button<{ location: string }>`
  width: ${(p) => (p.location === "project_page" ? "3.5rem" : "2.5rem")};
  height: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: var(--fs7);
  box-shadow: 0 0 0 2px var(--underlay1);
  font-weight: var(--fwBold);
  /* border-radius: ${(p) => (p.location === "project_page" ? "50%" : "0.6rem")}; */
  border: none;
  cursor: pointer;
  transition: var(--transition1);

  &:hover {
    background-color: var(--underlay2);
  }

  > span.icon {
    color: var(--secondaryColor);
    font-size: var(--fs5);
  }

  > span.num {
    color: var(--secondaryColor);
    margin-top: -0.25rem;
    padding-bottom: 0.25rem;
  }
`

export default DefaultBtn
