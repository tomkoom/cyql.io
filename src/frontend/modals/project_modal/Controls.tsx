import React, { FC } from "react"
import styled from "styled-components"
import useBackend from "@/hooks/useBackend"
import { Btn } from "@/components/btns/_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import {
  selectProject,
  selectProjectModalMode,
  setCloseProjectModal,
  setProjectModalIsLoading,
} from "@/state/modals/projectModal"

const Controls: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { addProject, editProject, refreshProjects } = useBackend()
  const project = useAppSelector(selectProject)
  const mode = useAppSelector(selectProjectModalMode)

  const add = async (): Promise<void> => {
    dispatch(setProjectModalIsLoading(true))
    await addProject(project)
    await refreshProjects()
    dispatch(setProjectModalIsLoading(false))
  }

  const edit = async (): Promise<void> => {
    dispatch(setProjectModalIsLoading(true))
    await editProject(project)
    await refreshProjects()
    dispatch(setProjectModalIsLoading(false))
  }

  // const archiveProject = (): void => {}

  const closeModal = (): void => {
    dispatch(setCloseProjectModal())
  }

  return (
    <ControlsStyled>
      {/* {deleteConfirm === false ? (
        <DeleteBtn>
          <Btn btnType="secondary" text="archive" onClick={confirmArchive} />
        </DeleteBtn>
      ) : (
        <DeleteContainer>
          <Btn btnType="secondary" text="cancel" onClick={cancelDeletion} />
          <Btn btnType="secondary" text="confirm" onClick={archiveProject} />
        </DeleteContainer>
      )} */}

      <Btn btnType="secondary" text="cancel" onClick={closeModal} />

      {mode === "add" ? (
        <Btn btnType="primary" text="add" onClick={add} />
      ) : mode === "edit" ? (
        <Btn btnType="primary" text="edit" onClick={edit} />
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
