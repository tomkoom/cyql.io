import React, { FC, useEffect, ReactNode } from "react"
import { createPortal } from "react-dom"
import { useScrollLock } from "@/hooks/useScrollLock"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectTheme } from "@/state/theme"

interface RootModalProps {
  isOpen: boolean
  children: ReactNode
}

const RootModal: FC<RootModalProps> = ({ isOpen, children }): JSX.Element => {
  const { lockScroll, unlockScroll } = useScrollLock()
  const theme = useAppSelector(selectTheme)
  const style = { zIndex: "1" }

  useEffect(() => {
    if (isOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div style={style} className={theme}>
      {children}
    </div>,
    document.getElementById("modal")
  )
}

export default RootModal
