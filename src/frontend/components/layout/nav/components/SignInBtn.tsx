import { Btn } from "@/components/btns"
import { iSignIn } from "@/components/icons/Icons"
import { useAppDispatch } from "@/hooks/useRedux"
import { setSignInModalIsOpen } from "@/state/modals/signInModal"
import React from "react"

export default function SignInBtn() {
  const dispatch = useAppDispatch()

  const openSignInModal = () => {
    dispatch(setSignInModalIsOpen(true))
  }

  return (
    <Btn btnType={"primary"} text={"Sign In"} icon={iSignIn} onClick={openSignInModal} />
  )
}
