import React, { FC } from "react"
import styled from "styled-components"
import { Btn } from "@/components/btns/_index"
import { useAuth } from "@/context/Auth"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectProposalModalData } from "@/state/modals/proposalModal"
import { setSignInModalIsOpen } from "@/state/modals/signInModal"

interface VotesProps {
  proposal: any
}

const Votes: FC<VotesProps> = ({ proposal }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAuth()

  const openSignInModal = (): void => {
    dispatch(setSignInModalIsOpen(true))
  }
  return (
    <VotesStyled>
      <ul>
        <li>
          <span className="label">Voting power to accept</span>
          <span className="value">{Object.keys(proposal.votesYes)[0]}</span>
        </li>

        <li>
          <span className="label">Voting power to reject</span>
          <span className="value">{proposal.votesNo}</span>
        </li>

        <li>
          <span className="label">Voters to accept</span>
          <span className="value">{proposal.votersYes}</span>
        </li>

        <li>
          <span className="label">Voters to reject</span>
          <span className="value">{proposal.votersNo}</span>
        </li>

        <li>
          <span className="label">Total voters</span>
          <span className="value">{+proposal.votersYes + +proposal.votersNo}</span>
        </li>
      </ul>

      {!isAuthenticated ? (
        <Btn btnType={"primary"} text={"Sign in to Vote"} onClick={openSignInModal} />
      ) : (
        <div className="actions">
          <Btn
            btnType={"primary"}
            text={"Reject"}
            style={{ backgroundColor: "var(--colorErr)", color: "#fff" }}
          />
          <Btn
            btnType={"primary"}
            text={"Accept"}
            style={{ backgroundColor: "var(--colorAccept)", color: "#fff" }}
          />
        </div>
      )}
    </VotesStyled>
  )
}

const VotesStyled = styled.div`
  > ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;

    > li {
      width: 100%;
      display: flex;
      gap: 0.5rem;
      font-size: var(--fsText);
      font-weight: var(--fwRegular);
      color: var(--primaryColor);

      > span {
        flex: 1;
      }

      > span.label {
        color: var(--secondaryColor);
      }
    }
  }

  > div.actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;

    > button {
      flex: 1;
    }
  }
`

export default Votes
