import { Icon } from "@/components/Icon"
import CrossIcon from "@/components/icons/CrossIcon"
import { useAppDispatch } from "@/hooks/useRedux"
import Modal from "@/modals/Modal"
import { setSignInModalIsOpen } from "@/state/modals/signInModal"
import { SignInMethods } from "."

interface SingInModalProps {
  isOpen: boolean
}

export default function SignInModal({ isOpen }: SingInModalProps) {
  const dispatch = useAppDispatch()

  const closeModal = () => {
    dispatch(setSignInModalIsOpen(false))
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal} showCloseIcon={false}>
      <div className="w-full space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon lucideName="LogIn" className="h-6 w-6" />
              <h3 className="text-primary text-3xl font-semibold">Sign In</h3>
            </div>

            <CrossIcon onClick={closeModal} />
          </div>
        </div>
        <SignInMethods />

        <div className="bg-muted/50 space-y-2 rounded-lg p-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="flex h-4 w-4 items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
            <h4 className="text-foreground font-medium">Secure & Private</h4>
          </div>
          <div className="text-coolgray-400 space-y-1">
            <p className="flex items-center gap-2">
              <Icon lucideName="Check" className="h-4 w-4" /> Your identity is cryptographically secured
            </p>
            <p className="flex items-center gap-2">
              <Icon lucideName="Check" className="h-4 w-4" /> No personal information is collected or stored
            </p>
            <p className="flex items-center gap-2">
              <Icon lucideName="Check" className="h-4 w-4" /> Works across the entire Internet Computer ecosystem
            </p>
          </div>
        </div>
      </div>
    </Modal>
  )
}
