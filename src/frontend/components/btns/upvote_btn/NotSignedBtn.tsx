import React, { FC } from "react"
import styled from "styled-components"
import { iCaretUp, iSignIn } from "@/components/icons/Icons"

interface DefaultBtnProps {
  upvotesNum: number
  btnLocation: string
  click: () => void
}

const NotSignedBtn: FC<DefaultBtnProps> = ({ upvotesNum, btnLocation, click }) => {
  return (
    <NotSignedBtnStyled>
      {btnLocation === "project_page" ? (
        <div className="_">
          <div className="upvotes_num">
            <span className="icon">{iCaretUp}</span>
            <span className="num">{upvotesNum}</span>
          </div>
          <ProjectPageBtn onClick={click}>{iSignIn} Sign in to Upvote</ProjectPageBtn>
        </div>
      ) : btnLocation === "project_page" ? (
        <ProjectListBtn onClick={click}>
          <span className="icon">{iCaretUp}</span>
          <span className="num">{upvotesNum}</span>
        </ProjectListBtn>
      ) : null}
    </NotSignedBtnStyled>
  )
}

const NotSignedBtnStyled = styled.div`
  > div._ {
    display: flex;
    align-items: stretch;
    gap: 0.5rem;
    flex-wrap: wrap;

    > div.upvotes_num {
      background-color: var(--underlay1);
      padding: 0 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      > span.icon {
        color: var(--secondaryColor);
      }

      > span.num {
        color: var(--secondaryColor);
        margin-top: -0.25rem;
        padding-bottom: 0.25rem;
      }
    }
  }
`

const ProjectPageBtn = styled.button`
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
`

const ProjectListBtn = styled.button`
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

export default NotSignedBtn
