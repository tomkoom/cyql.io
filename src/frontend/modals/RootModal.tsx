import { useAppSelector } from "@/hooks/useRedux"
import { useScrollLock } from "@/hooks/useScrollLock"
import { selectTheme } from "@/state/theme"
import { ReactNode, useEffect } from "react"
import { createPortal } from "react-dom"

interface RootModalProps {
  isOpen: boolean
  children: ReactNode
}

export default function RootModal({ isOpen, children }: RootModalProps) {
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
