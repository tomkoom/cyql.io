import React, { FC } from "react"
import styled from "styled-components"
import { useNav } from "@/hooks/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectActiveProjectsNum } from "@/state/curatedProjects"

const Header: FC = (): JSX.Element => {
  const { toProjects } = useNav()
  const projectsNum = useAppSelector(selectActiveProjectsNum)

  return (
    <HeaderStyled>
      <h2>Internet Computer Ecosystem Playground</h2>
      <p>
        Explore <span onClick={toProjects}>{projectsNum > 0 ? projectsNum : "..."}</span> #ic
        projects
      </p>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  > h2 {
    font-size: var(--fs1);
    font-weight: var(--fwBlack);
    line-height: 125%;
  }

  > p {
    font-size: var(--fs5);
    color: var(--secondaryColor);

    > span {
      font-weight: var(--fwBold);
      color: var(--primaryColor);
      cursor: pointer;
      box-shadow: var(--underlinePrimary);
      transition: var(--transition1);

      &:hover {
        color: var(--secondaryColor);
        box-shadow: var(--underlineSecondary);
      }
    }
  }
`

export default Header
