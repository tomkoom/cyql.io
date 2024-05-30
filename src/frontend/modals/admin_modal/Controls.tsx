import React, { FC } from "react"
import styled from "styled-components"
import { useProjects } from "@/hooks/_index"
import { Btn } from "@/components/btns/_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectAdmin, setAdminClearProject, setAdminCloseModal, setAdminIsLoading } from "@/state/admin/admin"

const Controls: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { addCuratedProject, editCuratedProject, refreshAll } = useProjects()
  const { project, mode } = useAppSelector(selectAdmin)

  const add = async (): Promise<void> => {
    dispatch(setAdminIsLoading(true))

    try {
      await addCuratedProject(project)
      await refreshAll()
      dispatch(setAdminClearProject())
      closeModal()
    } catch (error) {
      throw new Error(error)
    } finally {
      dispatch(setAdminIsLoading(false))
    }
  }

  const edit = async (): Promise<void> => {
    dispatch(setAdminIsLoading(true))

    try {
      await editCuratedProject(project)
      await refreshAll()
      closeModal()
    } catch (error) {
      throw new Error(error)
    } finally {
      dispatch(setAdminIsLoading(false))
    }
  }

  const closeModal = (): void => {
    dispatch(setAdminCloseModal())
  }

  return (
    <ControlsStyled>
      <Btn btnType="secondary" text="Cancel" onClick={closeModal} />

      {mode === "add" ? <Btn btnType="primary" text="Add" onClick={add} /> : mode === "edit" ? <Btn btnType="primary" text="Save" onClick={edit} /> : ""}
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
