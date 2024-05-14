import React, { FC, useEffect } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"
import { useScrollLock } from "@/hooks/_index"

// components
import { Controls, Form, Header } from "./_index"
import { Loading } from "@/components/ui/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectProjectModalIsLoading } from "@/state/modals/projectModal"
import { selectTheme } from "@/state/theme"

interface ProjectModalProps {
  isOpen: boolean
}

const ProjectModal: FC<ProjectModalProps> = ({ isOpen }): JSX.Element => {
  const { lockScroll, unlockScroll } = useScrollLock()
  const theme = useAppSelector(selectTheme)
  const isLoading = useAppSelector(selectProjectModalIsLoading)

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
        <Header />

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
  padding: 2rem;

  /* overflow */
  height: 100%;
  overflow: auto;

  > div.content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > div.form {
      margin-top: 1rem;
    }
  }
`

export default ProjectModal
