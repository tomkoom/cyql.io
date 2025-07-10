import CrossIcon from "@/components/icons/CrossIcon"
import { useScrollLock } from "@/hooks"
import { useAppSelector } from "@/hooks/useRedux"
import { selectTheme } from "@/state/theme"
import { FC, ReactNode, useEffect } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  showCloseIcon?: boolean
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, showCloseIcon = true }): JSX.Element => {
  const theme = useAppSelector(selectTheme)
  const { lockScroll, unlockScroll } = useScrollLock()

  useEffect(() => {
    if (isOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <ModalStyled className={theme} onClick={onClose}>
      <div className="content" onClick={(e) => e.stopPropagation()}>
        {showCloseIcon && <CrossIcon onClick={onClose} />}
        {children}
      </div>
    </ModalStyled>,
    document.getElementById("modal")
  )
}

const ModalStyled = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(var(--backgroundRgb), 0.6);
  padding: 1rem;
  z-index: 1;

  > div.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: var(--primaryColor);
    background-color: var(--background);
    padding: 1.5rem;
    border-radius: 1rem;
    /* box-shadow: var(--boxShadow1); */
  }
`

export default Modal
