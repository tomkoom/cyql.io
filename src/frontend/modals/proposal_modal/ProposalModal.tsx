import React, { FC } from "react"
import styled from "styled-components"
import CrossIcon from "@/components/icons/CrossIcon"
import { RootModal } from "../_index"
import { modalStyles } from "../_modalStyles"

interface ProposalModalProps {
  isOpen: boolean
  onClose: () => void
}

const ProposalModal: FC<ProposalModalProps> = ({ isOpen, onClose }): JSX.Element => {
  return (
    <RootModal isOpen={isOpen}>
      <ProposalModalStyled>
        <CrossIcon onClick={onClose} />
        <div>ProposalModal</div>
      </ProposalModalStyled>
    </RootModal>
  )
}

const ProposalModalStyled = styled.div`
  ${modalStyles}
`

export default ProposalModal
