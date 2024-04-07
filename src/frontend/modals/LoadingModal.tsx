import React, { FC, useEffect } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"
import { Spinner } from "@/components/ui/_index"
import { useScrollLock } from "@/hooks/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectTheme } from "@/state/theme"

interface LoadingModalProps {
  isOpen: boolean
}

const LoadingModal: FC<LoadingModalProps> = ({ isOpen }): JSX.Element => {
  const { lockScroll, unlockScroll } = useScrollLock()
  const theme = useAppSelector(selectTheme)
  const text = ["Writing to chain 🔗..."]

  // hide scrollbar
  useEffect(() => {
    if (isOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <LoadingModalStyled className={theme}>
      <Spinner />
      <p>{text[0]}</p>
    </LoadingModalStyled>,
    document.getElementById("modal")
  )
}

const LoadingModalStyled = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  /* ... */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: rgba(var(--backgroundRgb), 0.6);
  padding: 1rem;
  z-index: 999;

  > p {
    color: var(--primaryColor);
    font-size: var(--fsText);
  }
`

export default LoadingModal
