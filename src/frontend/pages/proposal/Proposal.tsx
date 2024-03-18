import React, { FC } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { BackBtn } from "@/components/btns/_index"
import { Details, Votes, ProjectData } from "./_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectProposals } from "@/state/dao/proposals"

const Proposal: FC = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const proposals = useAppSelector(selectProposals)
  const proposal = proposals.filter((p) => p.id === id)[0]
  const payload = proposal?.payload && JSON.parse(proposal.payload)

  if (!proposal) return null

  return (
    <ProposalStyled className="wrapper1440">
      <BackBtn />
      <div className="content">
        <div className="header">
          <h2 className="pageTitle">
            Proposal to List <span className="name">{payload.name || "[...]"}</span>
          </h2>
          <span className="id">{proposal.id}</span>
          <span className="state">{Object.keys(proposal.state)[0]}</span>
        </div>

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
            <ProjectData project={payload} />
          </div>
        </div>
      </div>
    </ProposalStyled>
  )
}

const ProposalStyled = styled.div`
  margin-bottom: 4rem;

  > div.content {
    > div.header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.125rem;
      margin-bottom: 2rem;

      > h2 {
        margin: unset;
        color: var(--secondaryColor);

        > span.name {
          color: var(--primaryColor);
        }
      }

      > span.id {
        font-size: var(--fsText);
        color: var(--secondaryColor);
        margin-bottom: 0.125rem;
      }

      > span.state {
        color: var(--primaryColor);
        background-color: var(--underlay1);
        font-size: var(--fsText);
        font-weight: var(--fwMedium);
        padding: 0.25rem;
      }
    }

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
  }
`

export default Proposal
