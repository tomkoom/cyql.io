import React, { FC } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"
import { IC_LOGO } from "@/constants/constants"
import useNav from "@/hooks/useNav"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectActiveProjectsNum } from "@/state/projects"

const Title: FC = (): JSX.Element => {
  const { toProjects } = useNav()
  const projectsNum = useAppSelector(selectActiveProjectsNum)

  return (
    <TitleStyled>
      curated list of{" "}
      {projectsNum > 0 ? (
        <ProjectsNum onClick={toProjects}>{projectsNum}</ProjectsNum>
      ) : (
        <Dots>...</Dots>
      )}{" "}
      <Badge>
        <img src={IC_LOGO} alt="Internet Computer logo" />
        <span>#InternetComputer</span>
      </Badge>{" "}
      projects
    </TitleStyled>
  )
}

const TitleStyled = styled.h2`
  font-size: var(--fs1);
  font-weight: var(--fwBlack);
  line-height: 125%;

  @media ${device.mobileL} {
    font-size: var(--fs2);
  }
`

const ProjectsNum = styled.span`
  text-decoration: underline;
  cursor: pointer;
`

const Dots = styled.span`
  color: var(--tertiaryColor);
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

export default Title
