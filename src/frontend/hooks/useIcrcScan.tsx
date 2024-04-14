import { useState } from "react"
import { useSearchParams } from "react-router-dom"

// state
import { useAppDispatch, useAppSelector } from "./useRedux"
import {
  selectIcrcTransactionsPagination,
  setIcrcTransactionsPaginationTotalItems,
  setIcrcTransactionsData,
} from "@/state/icrc_scan/icrcTransactions"

export interface IcrcMetadata {
  icrc1_decimals: string
  icrc1_fee: string
  icrc1_logo: string
  icrc1_max_memo_length: string
  icrc1_minting_account: { owner: string; subaccount: number }
  icrc1_name: string
  icrc1_symbol: string
  icrc1_total_supply: string
}

interface UseIcrcScan {
  icrcMetadata: IcrcMetadata
  getIcrcTxs: (ledgerCanister: string, offset: number, itemsPerPage: number) => Promise<void>
  getIcrcMetadata: (ledgerCanister: string) => Promise<void>
}

export const useIcrcScan = (): UseIcrcScan => {
  const dispatch = useAppDispatch()
  const [icrcMetadata, setIcrcMetadata] = useState<IcrcMetadata>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const ledgerIdParam = searchParams.get("ledger_id")
  const pagination = useAppSelector(selectIcrcTransactionsPagination)
  const itemsPerPage = pagination.itemsPerPage
  const offset = pagination.itemOffset

  const getIcrcTxs = async (): Promise<void> => {
    const url = `https://icrc-api.internetcomputer.org/api/v1/ledgers/${ledgerIdParam}/transactions?offset=${offset.toString()}&limit=${itemsPerPage.toString()}&sort_by=-index`

    try {
      const response = await fetch(url)
      const data = await response.json()
      dispatch(setIcrcTransactionsPaginationTotalItems(data.total_transactions))
      dispatch(setIcrcTransactionsData(data.data))
    } catch (e) {
      console.log(e)
    }
  }

  const getIcrcMetadata = async (): Promise<void> => {
    const url = `https://icrc-api.internetcomputer.org/api/v1/ledgers/${ledgerIdParam}`

    try {
      const response = await fetch(url)
      const data = await response.json()
      setIcrcMetadata(data.icrc1_metadata)
    } catch (e) {
      console.log(e)
    }
  }

  return {
    icrcMetadata,
    // ...
    getIcrcTxs,
    getIcrcMetadata,
  }
}
