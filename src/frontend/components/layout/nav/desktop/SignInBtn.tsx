import React, { FC } from "react"
import { iSignIn } from "@/components/icons/Icons"

// components
import { Btn } from "@/components/btns/_index"
import { SignInModal } from "@/modals/_index"

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { setSignInModalIsOpen, selectSignInModalIsOpen } from "@/state/modals/signInModal"

const SignInBtn: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(selectSignInModalIsOpen)

  const openSignInModal = (): void => {
    dispatch(setSignInModalIsOpen(true))
  }

  return (
    <div>
      <SignInModal isOpen={isOpen} />
      <Btn btnType="secondary" text="Sign In" icon={iSignIn} onClick={openSignInModal} />
    </div>
  )
}

export default SignInBtn
