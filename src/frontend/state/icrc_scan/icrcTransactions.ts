import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"
import type { Pagination } from "@/state/_types/types"

interface Transaction {
  index: number
  amount: string
  kind: string
  timestamp: string
  from_owner: string
  to_owner: string
}

interface IcrcTransactionsState {
  pagination: Pagination
  data: Transaction[]
}

const initialState: IcrcTransactionsState = {
  pagination: { itemsPerPage: 25, itemOffset: 0, endOffset: 0, totalItems: 0, selectedPage: 0 },
  data: [],
}

const icrcTransactions = createSlice({
  name: "icrcTransactions",
  initialState,
  reducers: {
    setIcrcTransactionsPaginationItemsPerPage(state, { payload }: PayloadAction<number>) {
      state.pagination.itemsPerPage = payload
    },
    setIcrcTransactionsPaginationItemOffset(state, { payload }: PayloadAction<number>) {
      state.pagination.itemOffset = payload
    },
    setIcrcTransactionsPaginationTotalItems(state, { payload }: PayloadAction<number>) {
      state.pagination.totalItems = payload
    },
    setIcrcTransactionsPaginationSelectedPage(state, { payload }: PayloadAction<number>) {
      state.pagination.selectedPage = payload
    },

    // ...
    setIcrcTransactionsData(state, { payload }: PayloadAction<Transaction[]>) {
      state.data = payload
    },
  },
})

export const selectIcrcTransactionsPagination = (state: RootState) =>
  state.icrcTransactions.pagination
export const selectIcrcTransactionsData = (state: RootState) => state.icrcTransactions.data

export const {
  setIcrcTransactionsPaginationItemsPerPage,
  setIcrcTransactionsPaginationItemOffset,
  setIcrcTransactionsPaginationTotalItems,
  setIcrcTransactionsPaginationSelectedPage,

  // ...
  setIcrcTransactionsData,
} = icrcTransactions.actions
export default icrcTransactions.reducer
