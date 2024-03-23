import React, { FC } from "react"
import styled from "styled-components"
import { iBolt } from "@/components/icons/Icons"

interface VotingBarProps {
  proposal: any
}

const VotingBar: FC<VotingBarProps> = ({ proposal }): JSX.Element => {
  const votingPowerToAccept = proposal.votesYes
  const votingPowerToReject = proposal.votesNo
  const vpPercentToAccept = (votingPowerToAccept / 2680) * 100
  const vpPercentToReject = (votingPowerToReject / 2680) * 100

  return (
    <VotingBarStyled>
      <div className="content">
        {/* percent */}
        <div className="percent">
          <div className="label">To accept: {vpPercentToAccept.toFixed(2)}%</div>
          <div className="label">To reject: {vpPercentToReject.toFixed(2)}%</div>
        </div>

        {/* bar */}
        <div className="bar_wrapper">
          <div className="bar accept">
            <div style={{ width: `${vpPercentToAccept}%` }} className="fill"></div>
          </div>

          <div className="bar reject">
            <div style={{ width: `${vpPercentToReject}%` }} className="fill"></div>
          </div>
        </div>

        <div className="voting_power">
          <span>
            {iBolt} {votingPowerToAccept.toString()} / 2680
          </span>

          <span>
            {iBolt} {votingPowerToReject.toString()} / 2680
          </span>
        </div>

        <div className="voters">
          <span>Voters: {proposal.votersYes.toString()}</span>
          <span>Voters: {proposal.votersNo.toString()}</span>
        </div>
      </div>
    </VotingBarStyled>
  )
}

const VotingBarStyled = styled.div`
  margin: 1rem 0;

  > div.content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    > div.percent {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    > div.voting_power {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;

      > span {
        font-size: var(--fsText);
        color: var(--secondaryColor);
      }
    }

    > div.voters {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;

      > span {
        font-size: var(--fsText);
        color: var(--secondaryColor);
      }
    }

    > div.bar_wrapper {
      display: flex;
      align-items: center;

      > div.bar {
        flex: 1;
        height: 1rem;
        background-color: var(--underlay2);

        > div.fill {
          height: 100%;
        }

        &.accept {
          display: flex;
          justify-content: flex-start;

          > div.fill {
            background-color: var(--colorAccept1);
          }
        }

        &.reject {
          display: flex;
          justify-content: flex-end;

          > div.fill {
            background-color: var(--colorReject1);
          }
        }
      }
    }
  }
`

export default VotingBar
