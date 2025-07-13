import { Change } from "@/components/ui/price/_index"
import { IC_LOGO } from "@/constants/constants"
import { useFormattedProjectsCount } from "@/hooks/queries/useProjectsStats"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { fetchIcpPrice, selectIcp24hPriceChange, selectIcpPrice } from "@/state/icpPrice"
import { useEffect } from "react"
import styled from "styled-components"

export default function Summary() {
  const dispatch = useAppDispatch()
  const { formattedCount, isLoading: isProjectsLoading } = useFormattedProjectsCount()
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
        Projects: <span className={`num ${isProjectsLoading ? "loading" : ""}`}>{formattedCount}</span>
      </p>
      <div className="bg-coolgray-800 h-4 w-px"></div>

      <div>
        <img src={IC_LOGO} alt="Internet Computer logo" />
        <span>{"$" + price}</span>
        <Change change={Number(change)} />
      </div>
    </SummaryStyled>
  )
}

const SummaryStyled = styled.span`
  padding: 0.125rem 0.5rem;
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

      &.loading {
        opacity: 0.7;
        animation: pulse 1.5s ease-in-out infinite;
      }
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

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.7;
    }
    50% {
      opacity: 1;
    }
  }
`
