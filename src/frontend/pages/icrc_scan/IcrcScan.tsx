import React, { FC, useState, useEffect } from "react"
import styled from "styled-components"
import { TextInputOutlined } from "@/components/ui/_index"
import { Btn } from "@/components/btns/_index"
import { useSearchParams } from "react-router-dom"
import { CKBTC_LEDGER_CANISTER_ID_IC } from "@/constants/constants"
import { Pagination, Table } from "./_index"
import { useIcrcScan } from "@/hooks/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectIcrcTransactionsPagination } from "@/state/icrc_scan/icrcTransactions"
import { selectIcrcTransactionsData } from "@/state/icrc_scan/icrcTransactions"
import { notifyErr } from "@/utils/notify"

const IcrcScan: FC = (): JSX.Element => {
  const [ledgerId, setLedgerId] = useState("")
  const { getTxs } = useIcrcScan()
  const [searchParams, setSearchParams] = useSearchParams()
  const ledgerIdParam = searchParams.get("ledger_id")
  const txs = useAppSelector(selectIcrcTransactionsData)
  const pagination = useAppSelector(selectIcrcTransactionsPagination)
  const itemsPerPage = pagination.itemsPerPage
  const offset = pagination.itemOffset

  const setLedgerIdParam = (ledgerId: string): void => {
    return setSearchParams(
      (prev) => {
        if (ledgerId.length !== 27) notifyErr("Wrong ledger id length.")
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
      <h2 className="pageTitle">ICRC Scan</h2>

      <div>
        <div className="input">
          <label htmlFor="ledger_id">Ledger id</label>

          <div>
            <TextInputOutlined
              id="ledger_id"
              placeholder={CKBTC_LEDGER_CANISTER_ID_IC}
              defaultValue={ledgerIdParam}
              onChange={(e) => setLedgerId(e.target.value)}
            />
            <Btn btnType={"secondary"} text={"Search"} onClick={() => setLedgerIdParam(ledgerId)} />
          </div>
        </div>

        {txs?.length > 0 && <Pagination />}
        {txs?.length > 0 && <Table />}
        {txs?.length > 0 && <Pagination />}
      </div>
    </IcrcScanStyled>
  )
}

const IcrcScanStyled = styled.div`
  font-size: var(--fs7);

  > div {
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
  }
`

export default IcrcScan
