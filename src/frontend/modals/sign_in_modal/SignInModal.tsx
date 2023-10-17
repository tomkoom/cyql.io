import React, { FC, useEffect } from "react"
import styled from "styled-components"
import Modal from "@/modals/_Modal"

// hooks
import { useAuth } from "@/context/Auth"
import { useScrollLock } from "@/hooks/useScrollLock"

// components
import { SignInMethods } from "./_index"
import { Spinner } from "@/components/ui/_index"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setSignInModal } from "@/state/modals/modals"

interface SingInModalProps {
  isOpen: boolean
}

const SignInModal: FC<SingInModalProps> = ({ isOpen }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { signInLoading } = useAuth()
  const { lockScroll, unlockScroll } = useScrollLock()

  const closeModal = (): void => {
    dispatch(setSignInModal(false))
  }

  useEffect(() => {
    if (isOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }, [isOpen])

  if (signInLoading) {
    return (
      <LoadingBackdrop>
        <Spinner />
      </LoadingBackdrop>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Content onClick={(e) => e.stopPropagation()}>
        <h3>choose your sign-in method</h3>
        <SignInMethods />
      </Content>
    </Modal>
  )
}

const Content = styled.div`
  max-width: 24rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h3 {
    font-size: var(--fs4);
  }
`

const LoadingBackdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(var(--backgroundRgb), 0.8);
  padding: 1rem;
  z-index: 1;
`

export default SignInModal
