import React, { FC, useState, useEffect } from "react"
import styled from "styled-components"
import { TextInput2 } from "@/components/ui/_index"
import { RectBtn } from "@/components/btns/_index"
import { useSearchParams } from "react-router-dom"
import { CKBTC_LEDGER_CANISTER_ID_IC } from "@/constants/constants"
import { Pagination, Table } from "./_index"
import { useIcrcScan } from "@/hooks/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectIcrcTransactionsPagination } from "@/state/icrc_scan/icrcTransactions"
import { selectIcrcTransactionsData } from "@/state/icrc_scan/icrcTransactions"
import { notifyErr } from "@/utils/notify"

const ledgerIds = [
  { label: "ckBTC", id: CKBTC_LEDGER_CANISTER_ID_IC, decimals: 8 },
  { label: "ckETH", id: "ss2fx-dyaaa-aaaar-qacoq-cai", decimals: 18 },
  { label: "CHAT", id: "2ouva-viaaa-aaaaq-aaamq-cai", decimals: 8 },
]

const IcrcScan: FC = (): JSX.Element => {
  // const [ledger, setLedger] = useState()
  const [ledgerId, setLedgerId] = useState(CKBTC_LEDGER_CANISTER_ID_IC)
  const { getTxs } = useIcrcScan()
  const [searchParams, setSearchParams] = useSearchParams()
  const ledgerIdParam = searchParams.get("ledger_id")
  const txs = useAppSelector(selectIcrcTransactionsData)
  const pagination = useAppSelector(selectIcrcTransactionsPagination)
  const itemsPerPage = pagination.itemsPerPage
  const offset = pagination.itemOffset
  // console.log(ledgerIdParam)

  const setLedgerIdParam = (ledgerId: string): void => {
    setLedgerId(ledgerId)
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

  useEffect(() => {
    if (!ledgerIdParam) return
    getTxs(ledgerIdParam, offset, itemsPerPage)
  }, [ledgerIdParam, offset, itemsPerPage])

  return (
    <IcrcScanStyled>
      <div className="title">
        <h2 className="pageTitle">ICRC Tokens Explorer</h2>
        <p>Explore ICRC tokens transactions and stats</p>
      </div>

      <div className="content">
        <div className="input">
          <label htmlFor="ledger_id">Token ledger id</label>

          <div>
            <TextInput2
              id="ledger_id"
              placeholder={CKBTC_LEDGER_CANISTER_ID_IC}
              defaultValue={ledgerIdParam}
              value={ledgerId}
              onChange={(e) => setLedgerId(e.target.value)}
            />
            <RectBtn
              btnType={"secondary"}
              text={"Search"}
              onClick={() => setLedgerIdParam(ledgerId)}
            />
          </div>
        </div>

        {/* <ul className="ledger_ids">
          {ledgerIds.map((ledgerId) => (
            <li
              key={`${ledgerId.label}-${ledgerId.id}`}
              onClick={() => setLedgerIdParam(ledgerId.id)}
            >
              {ledgerId.label}
            </li>
          ))}
        </ul> */}

        {txs?.length > 0 && <Pagination />}
        {txs?.length > 0 && <Table />}
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
        font-size: var(--fs6);
        margin-bottom: 0.25rem;
        display: inline-block;
      }

      > div {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }

    > ul.ledger_ids {
      display: flex;
      align-items: center;
      gap: 0.125rem;
      margin-top: 0.125rem;

      > li {
        font-weight: var(--fwMedium);
        color: var(--secondaryColor);
        background-color: var(--underlay1);
        padding: 0.75rem 0.5rem;
        cursor: pointer;
        transition: var(--transition1);

        &:hover {
          color: var(--primaryColor);
          background-color: var(--underlay2);
        }
      }
    }
  }
`

export default IcrcScan
