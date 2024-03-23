import React, { FC } from "react"
import styled from "styled-components"
import { Btn } from "@/components/btns/_index"
import { useAuth } from "@/context/Auth"
import { useDao } from "@/hooks/_index"
import { VoteArgs, VoteArgs2, Vote } from "@/state/_types/dao_types"
import { VotingBar } from "./_index"

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { setSignInModalIsOpen } from "@/state/modals/signInModal"
import { setIsLoading } from "@/state/loading"
import { selectVotingPower } from "@/state/user"
import { iBolt } from "@/components/icons/Icons"

interface VotesProps {
  proposal: any
}

const Votes: FC<VotesProps> = ({ proposal }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAuth()
  const { vote, refreshProposals } = useDao()
  const votingPower = useAppSelector(selectVotingPower)

  const openSignInModal = (): void => {
    dispatch(setSignInModalIsOpen(true))
  }

  const castVote = async (voteValue: Vote, votingPower: number): Promise<void> => {
    try {
      dispatch(setIsLoading(true))
      const voteArgs: VoteArgs2 = {
        vote: voteValue,
        votingPower,
        proposalId: proposal.id,
      }
      await vote(voteArgs)
      await refreshProposals()
    } catch (e) {
      throw new Error(e)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  return (
    <VotesStyled>
      <p>Minimum voting threshold to list a project: {iBolt} 108 (~4%)</p>
      <VotingBar proposal={proposal} />

      {!isAuthenticated ? (
        <div className="actions">
          <Btn btnType={"primary"} text={"Sign in to Vote"} onClick={openSignInModal} />
        </div>
      ) : (
        <div className="actions">
          <Btn
            btnType={"reject"}
            text={"Reject"}
            // style={{ backgroundColor: "var(--colorErr)", color: "#fff" }}
            onClick={() => castVote({ no: null }, votingPower)}
          />

          <Btn
            btnType={"accept"}
            text={"Accept"}
            // style={{ backgroundColor: "var(--colorOk)", color: "#fff" }}
            onClick={() => castVote({ yes: null }, votingPower)}
          />
        </div>
      )}
    </VotesStyled>
  )
}

const VotesStyled = styled.div`
  > p {
    font-size: var(--fsText);
    color: var(--tertiaryColor);
  }

  > div.actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;

    > button {
      flex: 1;
    }
  }
`

export default Votes
