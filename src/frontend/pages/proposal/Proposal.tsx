import React, { FC } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { BackBtn } from "@/components/btns/_index"

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
        <h2 className="pageTitle">
          <span>Proposal to list</span> {payload.name || "[...]"}
        </h2>

        <div></div>
        <span>{payload.name || "[...]"}</span>
      </div>
    </ProposalStyled>
  )
}

const ProposalStyled = styled.div`
  > div.content {
    > h2 {
      > span {
        color: var(--secondaryColor);
      }
    }
  }
`

export default Proposal
