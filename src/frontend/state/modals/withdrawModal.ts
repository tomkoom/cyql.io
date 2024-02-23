import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

interface WithdrawModalState {
  isOpen: boolean
  token: string
  amountE8s: number
}

const initialState: WithdrawModalState = {
  isOpen: false,
  token: "",
  amountE8s: 0,
}

const withdrawModal = createSlice({
  name: "withdrawModal",
  initialState,
  reducers: {
    setWithdrawModalIsOpen(state, { payload }: PayloadAction<boolean>) {
      state.isOpen = payload
    },
    setWithdrawModalToken(state, { payload }: PayloadAction<string>) {
      state.token = payload
    },
    setWithdrawModalAmountE8s(state, { payload }: PayloadAction<number>) {
      state.amountE8s = payload
    },
  },
})

export const selectWithdrawModalIsOpen = (state: RootState) => state.withdrawModal.isOpen
export const selectWithdrawModalToken = (state: RootState) => state.withdrawModal.token
export const selectWithdrawModalAmountE8s = (state: RootState) => state.withdrawModal.amountE8s

export const { setWithdrawModalIsOpen, setWithdrawModalToken, setWithdrawModalAmountE8s } =
  withdrawModal.actions
export default withdrawModal.reducer
