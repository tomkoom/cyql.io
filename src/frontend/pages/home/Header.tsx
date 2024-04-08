import React, { FC } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"
import { useNav } from "@/hooks/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectActiveProjectsNum } from "@/state/projects"

const Header: FC = (): JSX.Element => {
  const { toProjects } = useNav()
  const projectsNum = useAppSelector(selectActiveProjectsNum)

  return (
    <HeaderStyled>
      <Title>
        Curated List of{" "}
        <span className="projects_num" onClick={toProjects}>
          {projectsNum > 0 ? projectsNum : "..."}
        </span>{" "}
        #ic Projects
      </Title>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.h2`
  font-size: var(--fs1);
  font-weight: var(--fwBlack);
  line-height: 125%;
  text-align: center;

  > span.projects_num {
    text-decoration: underline;
    cursor: pointer;
    transition: var(--transition1);

    &:hover {
      color: var(--secondaryColor);
    }
  }

  @media ${device.mobileL} {
    font-size: var(--fs2);
  }
`

export default Header
