import { Change } from "@/components/ui/price/_index"
import { IC_LOGO } from "@/constants/constants"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { selectActiveProjectsNum } from "@/state/curatedProjects"
import { useEffect } from "react"
import styled from "styled-components"
// import { selectProposalsNum } from "@/state/dao/proposals"
import { fetchIcpPrice, selectIcp24hPriceChange, selectIcpPrice } from "@/state/icpPrice"

export default function Summary() {
  const dispatch = useAppDispatch()
  const curatedNum = useAppSelector(selectActiveProjectsNum)
  // const proposedNum = useAppSelector(selectProposalsNum)

  // icp price
  const price = useAppSelector(selectIcpPrice)
  const change = useAppSelector(selectIcp24hPriceChange)

  useEffect(() => {
    dispatch(fetchIcpPrice())
    const interval = setInterval(() => {
      dispatch(fetchIcpPrice())
    }, 60 * 1_000)
    return () => clearInterval(interval)
  }, [])

  return (
    <SummaryStyled>
      <p>
        Projects: <span className="num">{curatedNum.toString() || "..."}</span>
      </p>

      <div className="w-px h-4 bg-coolgray-800"></div>

      {/* <p>
        Unique authed users since 05.06.2024: <span className="num">{users.length.toString() || "..."}</span>
      </p> */}

      {/* <p>
        Proposed Projects: <span className="num">{proposedNum.toString() || "..."}</span>
      </p> */}

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
