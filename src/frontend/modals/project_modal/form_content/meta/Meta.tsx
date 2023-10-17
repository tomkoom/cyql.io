import React, { FC } from "react"
import styled from "styled-components"

// components
import { Input } from "./_index"
import { Btn } from "../_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectProject, setProjectArchived } from "@/state/modals/project_modal/projectModal"

const Meta: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const project = useAppSelector(selectProject)

  const setArchived = (value): void => {
    dispatch(setProjectArchived(value))
  }

  return (
    <div>
      <div>
        <Input label={"added"} value={project.createdAt} id={"project-added"} />
        <Input label={"updated"} value={project.updatedAt} id={"project-updated"} />
      </div>

      <div>
        <SectionName>archived</SectionName>

        <BtnsList>
          <Btn property={project.archived} value={true} label={"true"} setProperty={setArchived} />
          <Btn
            property={project.archived}
            value={false}
            label={"false"}
            setProperty={setArchived}
          />
        </BtnsList>
      </div>
    </div>
  )
}

const SectionName = styled.p`
  font-weight: var(--fwBold);
  color: var(--tertiaryColor);
  margin-bottom: 0.5rem;
`

const BtnsList = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export default Meta
