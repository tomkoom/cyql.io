import React, { FC, useEffect } from "react"
import styled from "styled-components"
import { IC_LOGO } from "@/constants/constants"
import { Change } from "@/components/ui/price/_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectActiveCuratedProjectsNum } from "@/state/curatedProjects"
import { selectProposalsNum } from "@/state/dao/proposals"
import { selectIcpPrice, selectIcp24hPriceChange } from "@/state/icpPrice"
import { fetchIcpPrice } from "@/state/icpPrice"

const Summary: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const projectsNum = useAppSelector(selectActiveCuratedProjectsNum)
  const projectProposals = useAppSelector(selectProposalsNum)
  // icp price
  const price = useAppSelector(selectIcpPrice)
  const change = useAppSelector(selectIcp24hPriceChange)

  useEffect(() => {
    dispatch(fetchIcpPrice())
    const interval = setInterval(() => {
      dispatch(fetchIcpPrice())
    }, 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <SummaryStyled>
      <p>
        Curated Projects: <span className="num">{projectsNum || "..."}</span>
      </p>

      <p>
        Project Proposals: <span className="num">{projectProposals || "..."}</span>
      </p>

      <div>
        <img src={IC_LOGO} alt="Internet Computer logo" />
        <span>{"$" + price}</span>
        <Change change={Number(change)} />
      </div>
    </SummaryStyled>
  )
}

const SummaryStyled = styled.span`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: var(--fs7);
  font-weight: var(--fwMedium);
  background-color: var(--underlay1);

  > p {
    color: var(--tertiaryColor);

    > span.num {
      font-family: var(--monospace);
      font-size: var(--fs6);
      color: var(--primaryColor);
    }
  }

  > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: nowrap;

    * {
      font-family: var(--monospace);
      font-size: 0.8rem;
    }

    > img {
      height: 1rem;
      width: 1rem;
      object-fit: contain;
    }
  }
`

export default Summary
