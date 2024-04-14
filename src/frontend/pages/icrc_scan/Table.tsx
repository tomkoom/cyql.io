import React, { FC } from "react"
import styled from "styled-components"
import { trimZeroes, capitalizeFirstLetter, formatDateTime, formatIdLong } from "@/utils/_index"
import { iRightLeft, iFire, iCheck, iLeaf, iExternalLink } from "@/components/icons/Icons"
import type { IcrcMetadata } from "@/hooks/useIcrcScan"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectIcrcTransactionsData } from "@/state/icrc_scan/icrcTransactions"

interface TableProps {
  icrcMetadata: IcrcMetadata
}

const Table: FC<TableProps> = ({ icrcMetadata }): JSX.Element => {
  const txs = useAppSelector(selectIcrcTransactionsData)
  const decimalsMultiplied = 10 ** Number(icrcMetadata?.icrc1_decimals)
  console.log(icrcMetadata)
  console.log(decimalsMultiplied)

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
              <span>{trimZeroes((+tx.amount / decimalsMultiplied).toFixed(8))}</span>
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
              <span>{tx.from_owner ? formatIdLong(tx.from_owner) : "..."}</span>
              <span>{tx.to_owner ? formatIdLong(tx.to_owner) : "..."}</span>
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
