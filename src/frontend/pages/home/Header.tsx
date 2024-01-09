import React, { FC } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"
import { IC_LOGO } from "@/constants/constants"
import useNav from "@/hooks/useNav"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectActiveProjectsNum } from "@/state/projects"

const Header: FC = (): JSX.Element => {
  const { toProjects } = useNav()
  const projectsNum = useAppSelector(selectActiveProjectsNum)

  return (
    <HeaderStyled>
      <Title>
        curated list of{" "}
        {projectsNum > 0 ? (
          <span className="projects_num" onClick={toProjects}>
            {projectsNum}
          </span>
        ) : (
          <span className="dots">...</span>
        )}{" "}
        <Badge>
          <img src={IC_LOGO} alt="Internet Computer logo" />
          <span>#InternetComputer</span>
        </Badge>{" "}
        projects
      </Title>

      <p>discover new #ic projects</p>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  > p {
    color: var(--secondaryColor);
  }
`

const Title = styled.h2`
  font-size: var(--fs1);
  font-weight: var(--fwBlack);
  line-height: 125%;

  > div.projects_num {
    text-decoration: underline;
    cursor: pointer;
  }

  > div.dots {
    color: var(--tertiaryColor);
  }

  @media ${device.mobileL} {
    font-size: var(--fs2);
  }
`

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--fs4);
  padding: 0 1rem;
  border-radius: 4rem;
  background-color: var(--underlay1);

  > img {
    height: 2rem;
  }
`

export default Header
