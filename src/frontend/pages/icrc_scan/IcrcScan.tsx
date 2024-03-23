import React, { FC, useEffect } from "react"
import styled from "styled-components"
import { trimZeroes, capitalizeFirstLetter, formatDateTime, formatId } from "@/utils/_index"
import { E8S } from "@/constants/constants"
import { iRightLeft, iFire, iCheck, iLeaf, iExternalLink } from "@/components/icons/Icons"
import { Pagination } from "./_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import {
  selectIcrcTransactionsPagination,
  setIcrcTransactionsPaginationTotalItems,
  setIcrcTransactionsData,
} from "@/state/icrcTransactions"
import { setIcrcTotalSupply } from "@/state/icrcTotalSupply"
import { selectIcrcTransactionsData } from "@/state/icrcTransactions"

const IcrcScan: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const pagination = useAppSelector(selectIcrcTransactionsPagination)
  const itemsPerPage = pagination.itemsPerPage
  const offset = pagination.itemOffset
  const CKBTC_LEDGER_CANISTER = "mxzaz-hqaaa-aaaar-qaada-cai"
  const txs = useAppSelector(selectIcrcTransactionsData)
  const symbol = "ckBTC"

  const getTxs = async (offset: number): Promise<void> => {
    const url = `https://icrc-api.internetcomputer.org/api/v1/ledgers/${CKBTC_LEDGER_CANISTER}/transactions?offset=${offset.toString()}&limit=${itemsPerPage}&sort_by=-index`

    try {
      const response = await fetch(url)
      //   console.log("fetch txs")
      const data = await response.json()
      dispatch(setIcrcTransactionsPaginationTotalItems(data.total_transactions))
      dispatch(setIcrcTransactionsData(data.data))
    } catch (e) {
      console.log(e)
    }
  }

  const getTotalSupply = async (): Promise<void> => {
    const url = `https://icrc-api.internetcomputer.org/api/v1/ledgers/${CKBTC_LEDGER_CANISTER}/total-supply`

    try {
      const response = await fetch(url)
      //   console.log("fetch total supply")
      const data = await response.json()
      dispatch(setIcrcTotalSupply(data.data[0][1]))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    ;(async () => await getTxs(offset))()
    ;(async () => await getTotalSupply())()
  }, [offset])

  return (
    <IcrcScanStyled>
      <div className="transactions wrapper">
        <h2 className="pageTitle">ICRC Scan</h2>

        <Pagination />

        <div className="header">
          <span>Tx Index</span>
          <span>Amount</span>
          <span>Type</span>
          <span>Timestamp</span>
          <span>From</span>
          <span>To</span>
          <span className="icon"></span>
        </div>

        <ul>
          {txs.map((tx, i) => (
            <li key={i}>
              <a
                href={`https://dashboard.internetcomputer.org/bitcoin/transaction/${tx.index}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className="index">{tx.index.toString()}</span>
                <span>
                  {trimZeroes((+tx.amount / E8S).toFixed(8))} {symbol}
                </span>
                <span className="type">
                  <span>
                    <span className="icon">
                      {(tx.kind === "transfer" && iRightLeft) ||
                        (tx.kind === "burn" && iFire) ||
                        (tx.kind === "approve" && iCheck) ||
                        (tx.kind === "mint" && iLeaf)}
                    </span>{" "}
                    {capitalizeFirstLetter(tx.kind)}
                  </span>
                </span>
                <span>{formatDateTime(+tx.timestamp / 1_000_000)}</span>
                <span>{tx.from_owner ? formatId(tx.from_owner) : "..."}</span>
                <span>{tx.to_owner ? formatId(tx.to_owner) : "..."}</span>
                <span className="icon">{iExternalLink}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </IcrcScanStyled>
  )
}

const IcrcScanStyled = styled.div`
  font-size: var(--fs7);

  > div.transactions {
    > div.header {
      display: flex;
      align-items: center;
      padding: 1rem;

      > span {
        color: var(--secondaryColor);
        flex: 1;
      }

      > span.icon {
        flex: 0.1;
      }
    }

    > ul {
      > li:nth-child(2n + 1) {
        background-color: var(--underlay1);
      }

      > li {
        > a {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0.75rem;
          transition: var(--transition1);

          &:hover {
            background-color: var(--underlay2);
          }

          > span {
            color: var(--secondaryColor);
            flex: 1;
          }

          > span.index {
            color: var(--primaryColor);
          }

          > span.icon {
            flex: 0.1;
            color: var(--tertiaryColor);
          }

          > span.type {
            display: flex;

            > span {
              height: 1.5rem;
              display: flex;
              align-items: center;
              align-self: flex-start;
              gap: 0.2rem;
              font-size: 0.7rem;
              font-weight: var(--fwBold);
              color: var(--background);
              background-color: var(--secondaryColor);
              padding: 0 0.4rem;

              > span.icon {
                width: 1rem;
                height: 1rem;
                display: grid;
                place-items: center;
              }
            }
          }
        }
      }
    }
  }
`

export default IcrcScan
