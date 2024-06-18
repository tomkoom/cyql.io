import React, { FC, useEffect } from "react"
import styled from "styled-components"
import Modal from "@/modals/_Modal"
import { Btns, Link } from "./_index"
import { useScrollLock } from "@/hooks/_index"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setShareModal } from "@/state/modals/shareModal"

interface ShareModalProps {
  isOpen: boolean
  id: string
  name: string
  category: string[]
  description: string
}

const ShareModal: FC<ShareModalProps> = ({ isOpen, id, name, category, description }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { lockScroll, unlockScroll } = useScrollLock()

  const closeModal = (): void => {
    dispatch(setShareModal(false))
  }

  useEffect(() => {
    if (isOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }, [isOpen])

  if (!isOpen) return

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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  > h3 {
    font-size: var(--fs4);
  }
`

export default ShareModal
