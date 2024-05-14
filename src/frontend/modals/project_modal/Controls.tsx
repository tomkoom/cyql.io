import React, { FC } from "react"
import styled from "styled-components"
import { useBackend } from "@/hooks/_index"
import { Btn } from "@/components/btns/_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import {
  selectProject,
  selectProjectModalMode,
  setClearProject,
  setCloseProjectModal,
  setProjectModalIsLoading,
} from "@/state/modals/projectModal"

const Controls: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { addCuratedProject, editCuratedProject, refreshCuratedProjects } = useBackend()
  const project = useAppSelector(selectProject)
  const mode = useAppSelector(selectProjectModalMode)

  const add = async (): Promise<void> => {
    dispatch(setProjectModalIsLoading(true))
    await addCuratedProject(project)
    await refreshCuratedProjects()
    dispatch(setClearProject())
    dispatch(setProjectModalIsLoading(false))
    closeModal()
  }

  const edit = async (): Promise<void> => {
    dispatch(setProjectModalIsLoading(true))
    await editCuratedProject(project)
    await refreshCuratedProjects()
    dispatch(setProjectModalIsLoading(false))
    closeModal()
  }

  const closeModal = (): void => {
    dispatch(setCloseProjectModal())
  }

  return (
    <ControlsStyled>
      <Btn btnType="secondary" text="cancel" onClick={closeModal} />

      {mode === "add" ? (
        <Btn btnType="primary" text="add" onClick={add} />
      ) : mode === "edit" ? (
        <Btn btnType="primary" text="save" onClick={edit} />
      ) : (
        ""
      )}
    </ControlsStyled>
  )
}

const ControlsStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
`

const DeleteBtn = styled.div`
  margin-right: auto;
`

const DeleteContainer = styled.div`
  margin-right: auto;
  display: flex;
  gap: 0.75rem;
`

export default Controls
