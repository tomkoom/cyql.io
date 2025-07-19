import { CrossIcon } from "@/components/icons"
import { Loading } from "@/components/ui"
import { useScrollLock } from "@/hooks"
import { useProjects } from "@/hooks/backend/useProjects"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { selectAdmin, setAdminCloseModal } from "@/state/admin/admin"
import { selectTheme } from "@/state/theme"
import { useEffect } from "react"
import { createPortal } from "react-dom"
import { Controls, Form, Header } from "."

interface ProjectModalProps {
  isOpen: boolean
}

export default function AdminModal({ isOpen }: ProjectModalProps) {
  const dispatch = useAppDispatch()
  const { lockScroll, unlockScroll } = useScrollLock()
  const { refreshCategories } = useProjects()
  const theme = useAppSelector(selectTheme)
  const isLoading = useAppSelector(selectAdmin).isLoading
  const mode = useAppSelector(selectAdmin).mode

  const closeModal = (): void => {
    dispatch(setAdminCloseModal())
  }

  useEffect(() => {
    if (isOpen) {
      lockScroll()
      // Load categories when modal opens
      refreshCategories().catch(console.error)
    } else {
      unlockScroll()
    }
  }, [isOpen])

  if (!isOpen) return null

  const modalContent = (
    <div className={`fixed top-0 left-0 z-10 h-full w-screen overflow-auto bg-[var(--background)] px-4 py-8 text-[var(--primaryColor)] ${theme}`}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex w-full flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <CrossIcon onClick={closeModal} />
            <p>Mode: {mode}</p>
            <Header />
          </div>

          <div className="my-8 mb-16">
            <Form />
            <Controls />
          </div>
        </div>
      )}
    </div>
  )

  return createPortal(modalContent, document.getElementById("modal"))
}
