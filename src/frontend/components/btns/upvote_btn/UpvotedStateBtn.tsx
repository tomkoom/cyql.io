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
  return location === "project_page" ? (
    <UpvotedStateBtnStyled_ProjectPage onClick={click}>
      {iCheck} Upvoted
      <div>
        <span className="icon">{iCaretUp}</span>
        <span className="num">{upvotesNum}</span>
      </div>
    </UpvotedStateBtnStyled_ProjectPage>
  ) : (
    <UpvotedStateBtnStyled_Projects onClick={click}>
      <span className="icon">{iCaretUp}</span>
      <span className="num">
        {iCheck} {upvotesNum}
      </span>
    </UpvotedStateBtnStyled_Projects>
  )
}

const UpvotedStateBtnStyled_ProjectPage = styled.button`
  height: 3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--fsText);
  background-color: var(--underlay1);
  font-weight: var(--fwBold);
  padding: 0 1rem;
  border: none;
  cursor: pointer;
  transition: var(--transition1);

  &:hover {
    background-color: var(--underlay2);
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    > span.icon {
      color: var(--primaryColor);
    }

    > span.num {
      color: var(--primaryColor);
      margin-top: -0.25rem;
      padding-bottom: 0.25rem;
    }
  }
`

const UpvotedStateBtnStyled_Projects = styled.button`
  width: 2.5rem;
  height: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: var(--fs7);
  background-color: var(--underlay2);
  font-weight: var(--fwBold);
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
