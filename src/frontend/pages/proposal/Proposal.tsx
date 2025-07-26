import { BackBtn } from "@/components/btns"
import { useAppSelector } from "@/hooks/useRedux"
import { selectProposals } from "@/state/dao/proposals"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { Details, Header, ProjectData, Votes } from "."

export default function Proposal() {
  const { id } = useParams<{ id: string }>()
  const proposals = useAppSelector(selectProposals)
  const proposal = proposals.filter((p) => p.id === id)[0]
  const payload = proposal?.payload && JSON.parse(proposal.payload)

  if (!proposal) return null

  return (
    <ProposalStyled className="mx-auto w-full max-w-[1280px]">
      <BackBtn />
      <div className="content">
        <Header proposal={proposal} />

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
    > div.panels {
      width: 100%;

      > div.panel {
        background-color: var(--underlay1);
        padding: 1.5rem;
        margin-bottom: 1rem;

        > h4 {
          font-size: var(--fs5);
          margin-bottom: 0.6rem;
        }
      }
    }
  }
`
