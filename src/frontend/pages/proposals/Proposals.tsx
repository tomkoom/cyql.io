import React, { FC } from "react"
import styled from "styled-components"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectProposals } from "@/state/dao/proposals"

const Proposals: FC = (): JSX.Element => {
  const proposals = useAppSelector(selectProposals)

  return (
    <ProposalsStyled>
      <h2 className="pageTitle">Proposed Projects</h2>
      <div className="header">
        <span>Id</span>
        <span>Voting power to accept</span>
        <span>Voting power to reject</span>
      </div>

      <ul>
        {proposals.map((proposal) => (
          <li key={`proposal_id_${proposal.id}`}>
            <span>{proposal.id.toString()}</span>
            <span>{proposal.votesYes ? proposal.votesYes.toString() : "N/A"}</span>
            <span>{proposal.votesNo ? proposal.votesNo.toString() : "N/A"}</span>
          </li>
        ))}
      </ul>
    </ProposalsStyled>
  )
}

const ProposalsStyled = styled.div`
  > h2 {
    text-align: center;
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
      font-size: var(--fsText);
      cursor: pointer;
      transition: var(--transition1);

      &:hover {
        background-color: var(--underlay2);
      }

      > span {
        flex: 1;
      }
    }
  }
`

export default Proposals
