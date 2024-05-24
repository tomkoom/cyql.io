import React, { FC } from "react"
import styled from "styled-components"
import { iCaretUp } from "@/components/icons/Icons"

interface DefaultBtnProps {
  upvotesNum: number
  location: string
  click: () => void
}

const DefaultBtn: FC<DefaultBtnProps> = ({ upvotesNum, location, click }) => {
  return location === "project_page" ? (
    <DefaultBtnStyled_ProjectPage onClick={click}>
      Upvote
      <div>
        <span className="icon">{iCaretUp}</span>
        <span className="num">{upvotesNum}</span>
      </div>
    </DefaultBtnStyled_ProjectPage>
  ) : (
    <DefaultBtnStyled_Projects onClick={click}>
      <span className="icon">{iCaretUp}</span>
      <span className="num">{upvotesNum}</span>
    </DefaultBtnStyled_Projects>
  )
}

const DefaultBtnStyled_ProjectPage = styled.button`
  height: 3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--fsText);
  background-color: var(--highlight1);
  font-weight: var(--fwBold);
  padding: 0 1rem;
  border: none;
  cursor: pointer;
  transition: var(--transition1);

  &:hover {
    background-color: var(--highlight3);
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    > span.icon {
      color: var(--secondaryColor);
    }

    > span.num {
      color: var(--secondaryColor);
      margin-top: -0.25rem;
      padding-bottom: 0.25rem;
    }
  }
`

const DefaultBtnStyled_Projects = styled.button`
  width: 2.5rem;
  height: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: var(--fs7);
  box-shadow: 0 0 0 2px var(--underlay1);
  font-weight: var(--fwBold);
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
