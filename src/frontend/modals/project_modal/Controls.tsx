import React, { FC, useState } from "react"
import styled from "styled-components"

// juno
import { PROJECTS_COLL } from "@/constants/constants"
import { getDoc, setDoc, delDoc } from "@junobuild/core"
import { refreshProjects } from "@/shared/juno"

// project id
import { projectId } from "@/utils/projectId"

// components
import { Btn } from "@/components/btns/_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectProjectDoc, setCloseProjectModal } from "@/state/modals/projectModal/projectModal"
import {
  setProjectModalLoadingSet,
  setProjectModalLoadingDel,
} from "@/state/modals/projectModal/projectModalLoading"

const Controls: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const project = useAppSelector(selectProjectDoc)
  const collection = PROJECTS_COLL

  const get = async (key: string) => {
    return getDoc({ collection, key })
  }

  const closeModal = (): void => {
    dispatch(setCloseProjectModal())
  }

  const confirmDeletion = (): void => {
    setDeleteConfirm(true)
  }

  const cancelDeletion = (): void => {
    setDeleteConfirm(false)
  }

  const submitProject = async (): Promise<void> => {
    dispatch(setProjectModalLoadingSet(true))
    const timestamp = Date.now()

    // check if doc exists
    const doc = await get(project.key)
    const key = doc === undefined ? projectId() : project.key

    await setDoc({
      collection,
      doc: {
        key,
        data: {
          ...project.data,
          ...(doc === undefined ? { added: timestamp } : { edited: timestamp }),
        },
        ...(doc !== undefined && { updated_at: doc.updated_at }),
      },
    })
      .then(() => console.log("Doc set with the id", key))
      .catch((e) => console.log(e))

    await refreshProjects()
    dispatch(setProjectModalLoadingSet(false))
    closeModal()
  }

  const deleteProject = async () => {
    dispatch(setProjectModalLoadingDel(true))
    const doc = await get(project.key)

    await delDoc({ collection, doc })
      .then(() => console.log(`Doc with the id ${project.key} deleted.`))
      .catch((e) => console.log(e))

    await refreshProjects()
    dispatch(setProjectModalLoadingDel(false))
    closeModal()
  }

  return (
    <ControlsStyled>
      {deleteConfirm === false ? (
        <DeleteBtn>
          <Btn btnType="secondary" text="delete" onClick={confirmDeletion} />
        </DeleteBtn>
      ) : (
        <DeleteContainer>
          <Btn btnType="secondary" text="cancel" onClick={cancelDeletion} />
          <Btn btnType="secondary" text="confirm" onClick={deleteProject} />
        </DeleteContainer>
      )}

      <Btn btnType="secondary" text="cancel" onClick={closeModal} />
      <Btn btnType="primary" text="save" onClick={submitProject} />
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
