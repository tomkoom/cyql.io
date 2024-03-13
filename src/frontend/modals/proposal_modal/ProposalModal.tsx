import React, { FC } from "react"
import styled from "styled-components"
import CrossIcon from "@/components/icons/CrossIcon"
import { RootModal } from "../_index"
import { modalStyles } from "../_modalStyles"
import { Details } from "./_index"
import type { ProjectProposalData } from "@/state/_types/dao_types"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectProposalModalData } from "@/state/modals/proposalModal"

interface ProposalModalProps {
  isOpen: boolean
  onClose: () => void
}

const ProposalModal: FC<ProposalModalProps> = ({ isOpen, onClose }): JSX.Element => {
  const proposal = useAppSelector(selectProposalModalData)
  const project: ProjectProposalData = proposal.payload ? JSON.parse(proposal.payload) : null

  return (
    <RootModal isOpen={isOpen}>
      <ProposalModalStyled>
        <CrossIcon onClick={onClose} />
        <h3>
          Proposal to List <span>{project.name || "[...]"}</span>
        </h3>

        {project ? (
          <div className="content">
            <Details proposal={proposal} />
          </div>
        ) : (
          <div>{String(project)}</div>
        )}
      </ProposalModalStyled>
    </RootModal>
  )
}

const ProposalModalStyled = styled.div`
  ${modalStyles}

  > h3 {
    font-size: var(--fs5);
    text-align: center;
    color: var(--secondaryColor);

    > span {
      color: var(--primaryColor);
    }
  }

  > div.content {
    width: 100%;
  }
`

export default ProposalModal
