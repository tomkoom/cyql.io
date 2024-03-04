import React, { FC } from "react"
import styled from "styled-components"
import Modal from "@/modals/_Modal"
import { Links } from "./_index"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setNftModal } from "@/state/modals/nftModal"

interface NftModalProps {
  isOpen: boolean
}

const NftModal: FC<NftModalProps> = ({ isOpen }): JSX.Element => {
  const dispatch = useAppDispatch()
  const text =
    "cyql NFT is the main asset of the project which represents its development progress and will carry a number of utilities which can be used on the platform."

  const closeModal = (): void => {
    dispatch(setNftModal(false))
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Content>
        <h3>cyql NFT</h3>
        <p>{text}</p>
        <Links />
      </Content>
    </Modal>
  )
}

const Content = styled.div`
  max-width: 24rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;

  > h3 {
    color: var(--primaryColor);
  }

  > p {
    color: var(--primaryColor);
  }
`

export default NftModal
