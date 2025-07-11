import { CrossIcon } from "@/components/icons"
import { useScrollLock } from "@/hooks"
import React, { FC, useEffect } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"

// components
import { Loading } from "@/components/ui"
import { Controls, Form, Header } from "./_index"

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { selectAdmin, setAdminCloseModal } from "@/state/admin/admin"
import { selectTheme } from "@/state/theme"

interface ProjectModalProps {
  isOpen: boolean
}

const AdminModal: FC<ProjectModalProps> = ({ isOpen }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { lockScroll, unlockScroll } = useScrollLock()
  const theme = useAppSelector(selectTheme)
  const isLoading = useAppSelector(selectAdmin).isLoading
  const mode = useAppSelector(selectAdmin).mode

  const closeModal = (): void => {
    dispatch(setAdminCloseModal())
  }

  useEffect(() => {
    if (isOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }, [isOpen])

  if (!isOpen) return null

  if (isLoading) {
    return (
      <ProjectModalStyled className={theme}>
        <Loading />
      </ProjectModalStyled>
    )
  }

  return createPortal(
    <ProjectModalStyled className={theme}>
      <div className="content">
        <div className="header">
          <CrossIcon onClick={closeModal} />
          <p>Mode: {mode}</p>
          <Header />
        </div>

        <div className="form">
          <Form />
          <Controls />
        </div>
      </div>
    </ProjectModalStyled>,
    document.getElementById("modal")
  )
}

const ProjectModalStyled = styled.div`
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  color: var(--primaryColor);
  background-color: var(--background);
  padding: 1rem 2rem;

  /* overflow */
  height: 100%;
  overflow: auto;

  > div.content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > div.header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    > div.form {
      margin: 2rem 0 4rem 0;
    }
  }
`

export default AdminModal
