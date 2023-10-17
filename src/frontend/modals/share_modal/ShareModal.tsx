import React, { FC, useEffect } from "react"
import styled from "styled-components"
import Modal from "@/modals/_Modal"

// components
import { Btns, Link } from "./_index"

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { setShareModal, selectShareModal } from "@/state/modals/shareModal"

interface ShareModalProps {
  id: string
  name: string
  category: string[]
  description: string
}

const ShareModal: FC<ShareModalProps> = ({ id, name, category, description }): JSX.Element => {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(selectShareModal)

  const closeModal = () => {
    dispatch(setShareModal(false))
  }

  // hide scrollbar
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Content>
        <h3>Share {name} via</h3>
        <Btns id={id} name={name} category={category} description={description} />
        <Link />
      </Content>
    </Modal>
  )
}

const Content = styled.div`
  max-width: 24rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export default ShareModal
