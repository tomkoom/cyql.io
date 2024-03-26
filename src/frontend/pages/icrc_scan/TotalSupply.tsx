import React, { FC } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { E8S } from "@/constants/constants"
import { Btn } from "@/components/btns/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectIcrcTotalSupply } from "@/state/icrc_scan/icrcTotalSupply"
import { selectIcrcTransactionsPagination } from "@/state/icrc_scan/icrcTransactions"

const TotalSupply: FC = (): JSX.Element => {
  const navigate = useNavigate()
  const totalSupply = useAppSelector(selectIcrcTotalSupply)
  const pagination = useAppSelector(selectIcrcTransactionsPagination)
  const txsNum = pagination.totalItems
  const symbol = "ckBTC"

  const toMint = (): void => {
    navigate("/mint")
  }

  const formatNumber = (num: number) => {
    const options = {
      // minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
    return num.toLocaleString(undefined, options)
  }

  return (
    <TotalSupplyStyled className="wrapper1280">
      <div className="title">
        <h2 className="pageTitle" style={{ margin: "unset" }}>
          ckBTC TVL
        </h2>
        <Btn btnType={"primary"} text={"Mint"} onClick={toMint} />
      </div>

      <div className="stats">
        <div>
          <span className="label">Total Value Locked</span>
          {/* <span className="value">{formatNumber((+totalSupply / E8S) * btcPrice)} USD</span> */}
        </div>

        <div>
          <span className="label">Total Supply</span>
          <span className="value">
            {(+totalSupply / E8S).toFixed(4)} {symbol}
          </span>
        </div>

        <div>
          <span className="label">Total Transactions</span>
          <span className="value">{txsNum.toLocaleString()}</span>
        </div>
      </div>
    </TotalSupplyStyled>
  )
}

const TotalSupplyStyled = styled.div`
  margin-bottom: 1rem;

  > div.title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  > div.stats {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 1rem;

    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 2rem;
      /* box-shadow: var(--boxShadow1); */
      background-color: var(--underlay1);

      > span.label {
        font-size: var(--fs6);
      }

      > span.value {
        font-size: var(--fs3);
        font-weight: var(--fwMedium);
      }
    }
  }
`

export default TotalSupply
