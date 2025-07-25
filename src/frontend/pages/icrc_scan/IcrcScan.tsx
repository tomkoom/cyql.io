import { RectBtn } from "@/components/btns"
import { TextInput2 } from "@/components/ui"
import { CKBTC_LEDGER_CANISTER_ID_IC } from "@/constants/constants"
import { useIcrcScan } from "@/hooks"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { selectIcrcLedgerId, setIcrcLedgerId } from "@/state/icrc_scan/icrcLedger"
import { selectIcrcTransactionsData, selectIcrcTransactionsPagination } from "@/state/icrc_scan/icrcTransactions"
import { notifyErr } from "@/utils/index"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import styled from "styled-components"
import { Dashboard, Ledgers, Pagination, Table } from "."

export default function IcrcScan() {
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

  useEffect(() => {
    dispatch(setIcrcLedgerId(ledgerIdParam))
  }, [])

  return (
    <IcrcScanStyled>
      <div className="title">
        <h2 className="page-title">ICRC Explorer</h2>
        <p>Explore ICRC tokens transactions and stats</p>
      </div>

      <div className="content">
        <div className="input">
          <label htmlFor="ledger_id">ICRC token ledger id</label>

          <div>
            <TextInput2 id="ledger_id" placeholder={CKBTC_LEDGER_CANISTER_ID_IC} value={ledgerId} onChange={(e) => dispatch(setIcrcLedgerId(e.target.value))} />
            <RectBtn style={{ height: "4rem" }} btnType={"secondary"} text={"Search"} onClick={() => setLedgerIdParam(ledgerId)} />
          </div>
        </div>

        <Ledgers ledgerIdParam={ledgerIdParam} setLedgerIdParam={setLedgerIdParam} />

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
      color: var(--tertiaryColor);
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
  }
`
