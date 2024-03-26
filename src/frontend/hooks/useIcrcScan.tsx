import { useAppDispatch } from "./useRedux"
import {
  setIcrcTransactionsPaginationTotalItems,
  setIcrcTransactionsData,
} from "@/state/icrc_scan/icrcTransactions"

interface UseIcrcScan {
  getTxs: (ledgerCanister: string, offset: number, itemsPerPage: number) => Promise<void>
}

export const useIcrcScan = (): UseIcrcScan => {
  const dispatch = useAppDispatch()

  const getTxs = async (
    ledgerCanister: string,
    offset: number,
    itemsPerPage: number
  ): Promise<void> => {
    const url = `https://icrc-api.internetcomputer.org/api/v1/ledgers/${ledgerCanister}/transactions?offset=${offset.toString()}&limit=${itemsPerPage.toString()}&sort_by=-index`

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

  return { getTxs }
}
