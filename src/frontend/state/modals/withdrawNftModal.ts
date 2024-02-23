import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

interface WithdrawNftModalState {
  isOpen: boolean
  nftId: number
}

const initialState: WithdrawNftModalState = {
  isOpen: false,
  nftId: undefined,
}

const withdrawNftModal = createSlice({
  name: "withdrawNftModal",
  initialState,
  reducers: {
    setWithdrawNftModalIsOpen(state, { payload }: PayloadAction<boolean>) {
      state.isOpen = payload
    },
  },
})

export const selectWithdrawNftModalIsOpen = (state: RootState) => state.withdrawNftModal.isOpen

export const { setWithdrawNftModalIsOpen } = withdrawNftModal.actions
export default withdrawNftModal.reducer
