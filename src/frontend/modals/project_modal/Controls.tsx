import React, { FC } from "react"
import styled from "styled-components"
import { useBackend } from "@/hooks/_index"
import { Btn } from "@/components/btns/_index"
import type { Project } from "@/state/_types/curated_projects_types"

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
  const project: Project = useAppSelector(selectProject)
  const mode = useAppSelector(selectProjectModalMode)

  const add = async (): Promise<void> => {
    dispatch(setProjectModalIsLoading(true))

    try {
      await addCuratedProject(project)
      await refreshCuratedProjects()
      dispatch(setClearProject())
      closeModal()
    } catch (error) {
      throw new Error(error)
    } finally {
      dispatch(setProjectModalIsLoading(false))
    }
  }

  const edit = async (): Promise<void> => {
    dispatch(setProjectModalIsLoading(true))

    try {
      await editCuratedProject(project)
      await refreshCuratedProjects()
      closeModal()
    } catch (error) {
      throw new Error(error)
    } finally {
      dispatch(setProjectModalIsLoading(false))
    }
  }

  const closeModal = (): void => {
    dispatch(setCloseProjectModal())
  }

  return (
    <ControlsStyled>
      <Btn btnType="secondary" text="Cancel" onClick={closeModal} />

      {mode === "add" ? (
        <Btn btnType="primary" text="Add" onClick={add} />
      ) : mode === "edit" ? (
        <Btn btnType="primary" text="Save" onClick={edit} />
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

export default Controls
