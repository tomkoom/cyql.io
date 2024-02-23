import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

interface WithdrawNftModalState {
  isOpen: boolean
  nftIdx: number
}

const initialState: WithdrawNftModalState = {
  isOpen: false,
  nftIdx: undefined,
}

const withdrawNftModal = createSlice({
  name: "withdrawNftModal",
  initialState,
  reducers: {
    setWithdrawNftModalIsOpen(state, { payload }: PayloadAction<boolean>) {
      state.isOpen = payload
    },
    setWithdrawNftModalNftIdx(state, { payload }: PayloadAction<number>) {
      state.nftIdx = payload
    },
  },
})

export const selectWithdrawNftModalIsOpen = (state: RootState) => state.withdrawNftModal.isOpen
export const selectWithdrawNftModalNftIdx = (state: RootState) => state.withdrawNftModal.nftIdx

export const { setWithdrawNftModalIsOpen, setWithdrawNftModalNftIdx } = withdrawNftModal.actions
export default withdrawNftModal.reducer
