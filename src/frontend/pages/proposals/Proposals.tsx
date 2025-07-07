import React, { FC } from "react"
import styled from "styled-components"
import { useNav } from "@/hooks"
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectProposals } from "@/state/dao/proposals"
import { formatDateTime } from "@/utils/formatDateTime"

const Proposals: FC = (): JSX.Element => {
  const { toProposal } = useNav()
  const proposals = useAppSelector(selectProposals)
  const proposalsCopy = [...proposals]

  return (
    <ProposalsStyled>
      <div>
        <div className="title">
          <h2 className="pageTitle">Proposed Projects</h2>
          <p>Under dev</p>
          {/* <p>Vote to list add projects to the registry</p> */}
        </div>

        {/* <div className="header">
          <span>Proposal</span>
          <span>Id</span>
          <span>State</span>
        </div>

        <ul>
          {proposalsCopy.length > 0 ? (
            proposalsCopy
              .sort((a, b) => Number(b.id) - Number(a.id))
              .map((proposal) => (
                <li key={`proposal_id_${proposal.id}`} onClick={() => toProposal(proposal.id)}>
                  <span className="main">
                    <span>Proposal to list {JSON.parse(proposal.payload).name || "[...]"}</span>
                    <span className="created_at">Created at {formatDateTime(Number(proposal.createdAt) / 1_000_000)}</span>
                  </span>

                  <span>
                    <span>{proposal.id}</span>
                  </span>

                  <span className="state">
                    <span>{capitalizeFirstLetter(Object.keys(proposal.state)[0])}</span>
                  </span>
                </li>
              ))
          ) : (
            <li>...</li>
          )}
        </ul> */}
      </div>
    </ProposalsStyled>
  )
}

const ProposalsStyled = styled.div`
  > div {
    margin-bottom: 4rem;
    /* font-size: var(--fsText); */

    > div.title {
      text-align: center;
      margin-bottom: 2rem;

      > p {
        font-weight: var(--fwMedium);
        color: var(--tertiaryColor);
      }
    }

    > div.header,
    > ul li {
      padding: 0.75rem;
    }

    > div.header {
      display: flex;
      gap: 0.5rem;

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
          }

          > span.created_at {
            color: var(--tertiaryColor);
          }
        }

        > span.state {
          > span {
            padding: 0.25rem 0.4rem;
            background-color: var(--underlay2);
          }
        }
      }
    }
  }
`

export default Proposals
