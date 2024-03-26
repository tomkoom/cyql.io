import React, { FC, useEffect } from "react"
import styled from "styled-components"
import { trimZeroes, capitalizeFirstLetter, formatDateTime, formatId } from "@/utils/_index"
import { E8S } from "@/constants/constants"
import { iRightLeft, iFire, iCheck, iLeaf, iExternalLink } from "@/components/icons/Icons"
import { useIcrcScan } from "@/hooks/useIcrcScan"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectIcrcTransactionsPagination } from "@/state/icrcTransactions"
import { selectIcrcTransactionsData } from "@/state/icrcTransactions"

const Table = () => {
  const { getTxs, getTotalSupply } = useIcrcScan()
  const pagination = useAppSelector(selectIcrcTransactionsPagination)
  const itemsPerPage = pagination.itemsPerPage
  const offset = pagination.itemOffset
  const CKBTC_LEDGER_CANISTER = "mxzaz-hqaaa-aaaar-qaada-cai"
  const txs = useAppSelector(selectIcrcTransactionsData)
  const symbol = "ckBTC"

  useEffect(() => {
    ;(async () => await getTxs(CKBTC_LEDGER_CANISTER, offset, itemsPerPage))()
    ;(async () => await getTotalSupply(CKBTC_LEDGER_CANISTER))()
  }, [offset])

  return (
    <TableStyled>
      <ul className="header">
        <li>Tx Index</li>
        <li>Amount</li>
        <li>Type</li>
        <li>Timestamp</li>
        <li>From</li>
        <li>To</li>
        <li className="icon"></li>
      </ul>

      <ul className="content">
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
    </TableStyled>
  )
}

const TableStyled = styled.div`
  > ul.header {
    display: flex;
    align-items: center;
    padding: 1rem;

    > li {
      color: var(--secondaryColor);
      flex: 1;
    }

    > li.icon {
      flex: 0.1;
    }
  }

  > ul.content {
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
`

export default Table
