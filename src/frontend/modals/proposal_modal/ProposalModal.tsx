import React, { FC } from "react"
import styled from "styled-components"
import CrossIcon from "@/components/icons/CrossIcon"
import { RootModal } from "../_index"
import { modalStyles } from "../_modalStyles"
import { Details, Votes, ProjectData } from "./_index"
import type { ProjectProposalData } from "@/state/_types/dao_types"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectProposalModalData } from "@/state/modals/proposalModal"
import { setSignInModalIsOpen } from "@/state/modals/signInModal"

interface ProposalModalProps {
  isOpen: boolean
  onClose: () => void
}

const ProposalModal: FC<ProposalModalProps> = ({ isOpen, onClose }): JSX.Element => {
  const dispatch = useAppDispatch()
  const proposal = useAppSelector(selectProposalModalData)
  const project: ProjectProposalData = proposal?.payload ? JSON.parse(proposal.payload) : null

  const openSignInModal = (): void => {
    dispatch(setSignInModalIsOpen(true))
  }

  if (!project) return

  return (
    <RootModal isOpen={isOpen}>
      <ProposalModalStyled>
        <CrossIcon onClick={onClose} />
        <h3>
          Proposal to List <span className="name">{project.name || "[...]"}</span>{" "}
          <span className="state">{Object.keys(proposal.state)[0]}</span>
        </h3>

        {project ? (
          <div className="content">
            <div className="panels">
              <div className="panel">
                <h4>Details</h4>
                <Details proposal={proposal} />
              </div>

              <div className="panel">
                <h4>Votes</h4>
                <Votes proposal={proposal} />
              </div>

              <div className="panel">
                <h4>Proposal Payload / Project Data</h4>
                <ProjectData project={project} />
              </div>
            </div>
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

    > span.name {
      color: var(--primaryColor);
    }

    > span.state {
      color: var(--primaryColor);
      background-color: var(--underlay1);
      font-size: var(--fsText);
      font-weight: var(--fwMedium);
      padding: 0.25rem;
    }
  }

  > div.content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    > div.panels {
      width: 100%;

      > div.panel {
        background-color: var(--underlay1);
        padding: 1rem;
        margin-bottom: 1rem;

        > h4 {
          font-size: var(--fs6);
          margin-bottom: 0.5rem;
        }
      }
    }

    > div.actions {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;

      > button {
        flex: 1;
      }
    }
  }
`

export default ProposalModal
