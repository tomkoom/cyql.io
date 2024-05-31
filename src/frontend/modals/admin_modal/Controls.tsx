import React, { FC } from "react"
import styled from "styled-components"
import { useProjects } from "@/hooks/_index"
import { Btn } from "@/components/btns/_index"
import { Project } from "@/state/_types/curated_projects_types"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectAdmin, setAdminClearProject, setAdminCloseModal, setAdminIsLoading } from "@/state/admin/admin"

const Controls: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { addCuratedProject, editCuratedProject, refreshAll, refreshById } = useProjects()
  const { project, mode } = useAppSelector(selectAdmin)

  const refresh = async (project: Project): Promise<void> => {
    try {
      console.log("added / updated")
      console.log(project)
      await refreshById(project.id)
      await refreshAll()
    } catch (error) {
      throw new Error(error)
    }
  }

  const add = async (): Promise<void> => {
    dispatch(setAdminIsLoading(true))

    try {
      await addCuratedProject(project)
      await refresh(project)
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
      await refresh(project)
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
  align-items: start;
  gap: 0.5rem;
  margin-top: 2rem;

  > button {
    flex: 1;
  }
`

export default Controls
