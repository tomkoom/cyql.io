import React, { FC } from "react"
import styled from "styled-components"

// components
import { Btn } from ".."
import { Input } from "./_index"

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { selectAdmin, setAdminProjectItemBoolean } from "@/state/admin/admin"

const archivedKey = "archived"

const Meta: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const project = useAppSelector(selectAdmin).project

  const setArchived = (value: boolean): void => {
    dispatch(setAdminProjectItemBoolean({ [archivedKey]: value }))
  }

  return (
    <div>
      <div>
        <Input label={"createdAt"} value={project.createdAt} id={"project_createdAt"} />
        <Input label={"updatedAt"} value={project.updatedAt} id={"project_updatedAt"} />
      </div>

      <div>
        <SectionName>Archived</SectionName>

        <BtnsList>
          <Btn property={project.archived} value={true} label={"true"} setProperty={setArchived} />
          <Btn property={project.archived} value={false} label={"false"} setProperty={setArchived} />
        </BtnsList>
      </div>
    </div>
  )
}

const SectionName = styled.p`
  font-size: var(--fsText);
  font-weight: var(--fwMedium);
  color: var(--tertiaryColor);
  margin-bottom: 0.5rem;
`

const BtnsList = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export default Meta
