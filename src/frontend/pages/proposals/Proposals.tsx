import React, { FC } from "react"
import styled from "styled-components"
import { ProposalModal } from "@/modals/_index"
import { useNav } from "@/hooks/_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectProposals } from "@/state/dao/proposals"
import {
  setProposalModalIsOpen,
  selectProposalModalIsOpen,
  setProposalModalData,
} from "@/state/modals/proposalModal"

const Proposals: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { toProposal } = useNav()
  const proposals = useAppSelector(selectProposals)
  const proposalModalIsOpen = useAppSelector(selectProposalModalIsOpen)

  const closeModal = (): void => {
    dispatch(setProposalModalIsOpen(false))
  }

  const openModal = (proposalId: string): void => {
    const proposal = proposals.filter((p) => p.id === proposalId)[0]
    dispatch(setProposalModalData(proposal))
    dispatch(setProposalModalIsOpen(true))
  }

  return (
    <ProposalsStyled>
      <ProposalModal isOpen={proposalModalIsOpen} onClose={closeModal} />

      <div>
        <div className="title">
          <h2 className="pageTitle">Proposed Projects</h2>
          <p>Vote to list add projects to the registry</p>
        </div>

        <div className="header">
          <span>Id</span>
          <span>Voting power to accept</span>
          <span>Voting power to reject</span>
        </div>

        <ul>
          {proposals.length > 0 ? (
            proposals.map((proposal) => (
              <li key={`proposal_id_${proposal.id}`} onClick={() => toProposal(proposal.id)}>
                <span className="main">
                  <span>{proposal.id}</span>
                  <span className="status">{Object.keys(proposal.state)[0]}</span>
                </span>
                <span>{proposal.votesYes !== "0" || "..."}</span>
                <span>{proposal.votesNo !== "0" || "..."}</span>
              </li>
            ))
          ) : (
            <li>...</li>
          )}
        </ul>
      </div>
    </ProposalsStyled>
  )
}

const ProposalsStyled = styled.div`
  > div {
    margin-bottom: 4rem;
    font-size: var(--fsText);

    > div.title {
      text-align: center;
      margin-bottom: 2rem;

      > p {
        color: var(--secondaryColor);
      }
    }

    > div.header,
    > ul li {
      padding: 0.75rem;
    }

    > div.header {
      display: flex;
      align-items: flex-start;

      > span {
        flex: 1;
      }
    }

    > ul {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        background-color: var(--underlay1);
        cursor: pointer;
        transition: var(--transition1);

        &:hover {
          background-color: var(--underlay2);
        }

        > span {
          flex: 1;

          &.main {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;

            > span.status {
              padding: 0.125rem;
              background-color: var(--underlay2);
            }
          }
        }
      }
    }
  }
`

export default Proposals
