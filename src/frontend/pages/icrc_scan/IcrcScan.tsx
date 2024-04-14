import React, { FC, useEffect } from "react"
import styled from "styled-components"
import { TextInput2 } from "@/components/ui/_index"
import { RectBtn } from "@/components/btns/_index"
import { useSearchParams } from "react-router-dom"
import { CKBTC_LEDGER_CANISTER_ID_IC, LEDGERS } from "@/constants/constants"
import { Pagination, Table, Dashboard } from "./_index"
import { useIcrcScan } from "@/hooks/_index"
import { notifyErr } from "@/utils/_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import {
  selectIcrcTransactionsPagination,
  selectIcrcTransactionsData,
} from "@/state/icrc_scan/icrcTransactions"
import { selectIcrcLedgerId, setIcrcLedgerId } from "@/state/icrc_scan/icrcLedger"

const IcrcScan: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const ledgerIdParam = searchParams.get("ledger_id")
  const { icrcMetadata, getIcrcTxs, getIcrcMetadata } = useIcrcScan()
  const ledgerId = useAppSelector(selectIcrcLedgerId)
  const txs = useAppSelector(selectIcrcTransactionsData)
  const pagination = useAppSelector(selectIcrcTransactionsPagination)
  const itemsPerPage = pagination.itemsPerPage
  const offset = pagination.itemOffset

  const setLedgerIdParam = (ledgerId: string): void => {
    dispatch(setIcrcLedgerId(ledgerId))
    return setSearchParams(
      (prev) => {
        if (ledgerId.length !== 27) {
          notifyErr("Wrong ledger id length.")
        }
        prev.set("ledger_id", ledgerId)
        return prev
      },
      { replace: true }
    )
  }

  const getIcrcLedgerData = async (): Promise<void> => {
    try {
      await getIcrcMetadata(ledgerIdParam)
      await getIcrcTxs(ledgerIdParam, offset, itemsPerPage)
    } catch (e) {
      throw new Error(e)
    }
  }

  useEffect(() => {
    if (!ledgerIdParam) return
    getIcrcLedgerData()
  }, [ledgerIdParam, offset, itemsPerPage])

  return (
    <IcrcScanStyled>
      <div className="title">
        <h2 className="pageTitle">ICRC Tokens Explorer</h2>
        <p>Explore ICRC tokens transactions and stats</p>
      </div>

      <div className="content">
        <div className="input">
          <label htmlFor="ledger_id">ICRC token ledger id</label>

          <div>
            <TextInput2
              id="ledger_id"
              placeholder={CKBTC_LEDGER_CANISTER_ID_IC}
              value={ledgerId}
              onChange={(e) => dispatch(setIcrcLedgerId(e.target.value))}
            />
            <RectBtn
              btnType={"secondary"}
              text={"Search"}
              onClick={() => setLedgerIdParam(ledgerId)}
            />
          </div>
        </div>

        <ul className="ledgers">
          {LEDGERS.map((ledger) => (
            <li
              key={`${ledger.symbol}-${ledger.id}`}
              className={ledger.id === ledgerIdParam ? "active" : null}
              onClick={() => setLedgerIdParam(ledger.id)}
            >
              {ledger.symbol}
            </li>
          ))}
        </ul>

        {txs?.length > 0 && <Dashboard icrcMetadata={icrcMetadata} />}
        {txs?.length > 0 && <Pagination />}
        {txs?.length > 0 && <Table icrcMetadata={icrcMetadata} />}
        {txs?.length > 0 && <Pagination />}
      </div>
    </IcrcScanStyled>
  )
}

const IcrcScanStyled = styled.div`
  font-size: var(--fs7);

  > div.title {
    text-align: center;
    margin-bottom: 2rem;

    > p {
      font-size: var(--fs6);
      color: var(--secondaryColor);
    }
  }

  > div.content {
    > div.input {
      > label {
        font-size: var(--fsText);
        color: var(--secondaryColor);
        margin-bottom: 0.25rem;
        display: inline-block;
      }

      > div {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }

    > ul.ledgers {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.25rem;
      margin-top: 0.5rem;
      font-weight: var(--fwBold);

      > li {
        color: var(--secondaryColor);
        background-color: var(--underlay2);
        padding: 0.6rem 0.6rem;
        cursor: pointer;
        transition: var(--transition1);

        &:hover {
          color: var(--primaryColor);
          background-color: var(--underlay3);
        }

        &.active {
          color: var(--background);
          background-color: var(--primaryColor);
        }
      }
    }
  }
`

export default IcrcScan
