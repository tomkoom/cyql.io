import React, { FC } from "react"
import { iSignIn } from "@/components/icons/Icons"
import { useAuth } from "@/context/Auth"

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { setSignInModal } from "@/state/modals/modals"
import { selectSignInModal } from "@/state/modals/modals"

// components
import { Spinner } from "@/components/ui/_index"
import { Btn } from "@/components/btns/_index"
import { SignInModal } from "@/modals/_index"

const SignInBtn: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(selectSignInModal)
  const { signInLoading } = useAuth()

  const openSignInModal = (): void => {
    dispatch(setSignInModal(true))
  }

  return (
    <div>
      {/* modal */}
      <SignInModal isOpen={isOpen} />

      {signInLoading === false ? (
        <Btn btnType="secondary" text="sign in" icon={iSignIn} onClick={openSignInModal} />
      ) : (
        <Btn btnType="secondary" text="loading..." icon={<Spinner />} onClick={openSignInModal} />
      )}
    </div>
  )
}

export default SignInBtn
