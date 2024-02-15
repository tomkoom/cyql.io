import React, { FC, useEffect } from "react"
import styled from "styled-components"
import { IC_LOGO } from "@/constants/constants"
import { iArrowUp, iArrowDown } from "@/components/icons/Icons"
import { Change } from "./_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectIcpPrice, selectIcp24hPriceChange } from "@/state/icpPrice"
import { fetchIcpPrice } from "@/state/icpPrice"

const Price: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
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
    <PriceStyled>
      <img src={IC_LOGO} alt="Internet Computer logo" />
      <p>{"$" + price}</p>

      {change > 0 ? (
        <Change change={change} icon={iArrowUp} color="var(--colorOk)" />
      ) : change < 0 ? (
        <Change change={change} icon={iArrowDown} color="var(--colorErr)" />
      ) : (
        <Change change={change} icon="" color="var(--colorNeutral)" />
      )}
    </PriceStyled>
  )
}

const PriceStyled = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.5rem;
  font-size: 0.9rem;
  font-weight: var(--fwBold);
  background-color: var(--underlay1);

  > img {
    height: 1.125rem;
  }

  > span {
    color: var(--tertiaryColor);
  }

  * {
    font-family: var(--monospace);
  }
`

export default Price
