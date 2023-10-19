import React, { FC } from "react"
import styled from "styled-components"

// components
import { Btn } from "./_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectProject, setProjectGrantee } from "@/state/modals/project_modal/projectModal"

const Grantee: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const project = useAppSelector(selectProject)

  const setGrantee = (value: boolean) => {
    dispatch(setProjectGrantee(value))
  }

  return (
    <div>
      <SectionName>grantee</SectionName>

      <Btns>
        <Btn property={project.grantee} value={true} label={"true"} setProperty={setGrantee} />
        <Btn property={project.grantee} value={false} label={"false"} setProperty={setGrantee} />
      </Btns>
    </div>
  )
}

const SectionName = styled.p`
  font-size: var(--fsText);
  font-weight: var(--fwMedium);
  color: var(--tertiaryColor);
  margin-bottom: 0.5rem;
`

const Btns = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export default Grantee
