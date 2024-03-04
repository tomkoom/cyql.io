import React, { FC } from "react"
import styled from "styled-components"
import Modal from "@/modals/_Modal"
import { SignInMethods } from "./_index"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setSignInModalIsOpen } from "@/state/modals/signInModal"

interface SingInModalProps {
  isOpen: boolean
}

const SignInModal: FC<SingInModalProps> = ({ isOpen }): JSX.Element => {
  const dispatch = useAppDispatch()

  const closeModal = (): void => {
    dispatch(setSignInModalIsOpen(false))
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Content onClick={(e) => e.stopPropagation()}>
        <h3>sign-in</h3>
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
    text-align: center;
  }
`

export default SignInModal
