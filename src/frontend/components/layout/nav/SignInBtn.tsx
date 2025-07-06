import { Btn } from "@/components/btns/_index"
import { iSignIn } from "@/components/icons/Icons"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { SignInModal } from "@/modals/_index"
import { selectSignInModalIsOpen, setSignInModalIsOpen } from "@/state/modals/signInModal"
import React from "react"

export default function SignInBtn() {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(selectSignInModalIsOpen)

  const openSignInModal = (): void => {
    dispatch(setSignInModalIsOpen(true))
  }

  return (
    <div>
      <SignInModal isOpen={isOpen} />
      <Btn btnType={"primary"} text={"Sign In"} icon={iSignIn} onClick={openSignInModal} />
    </div>
  )
}


