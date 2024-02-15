import React, { FC } from "react"
import styled from "styled-components"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectActiveProjectsNum } from "@/state/projects"

const Summary: FC = (): JSX.Element => {
  const projectsNum = useAppSelector(selectActiveProjectsNum)

  return (
    <SummaryStyled>
      all projects: <span className="num">{projectsNum}</span>
    </SummaryStyled>
  )
}

const SummaryStyled = styled.span`
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  font-size: var(--fs7);
  font-weight: var(--fwMedium);
  color: var(--secondaryColor);
  background-color: var(--underlay1);

  > span.num {
    font-family: var(--monospace);
    font-size: var(--fs6);
    color: var(--primaryColor);
  }
`

export default Summary
