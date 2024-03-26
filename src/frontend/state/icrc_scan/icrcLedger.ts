import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"
import { ICP_LEDGER_CANISTER_ID_IC } from "@/constants/constants"

interface IcrcLedgerState {
  id: string
}

const initialState: IcrcLedgerState = {
  id: ICP_LEDGER_CANISTER_ID_IC,
}

const icrcLedger = createSlice({
  name: "icrcLedger",
  initialState,
  reducers: {
    setIcrcLedgerId(state, { payload }: PayloadAction<string>) {
      state.id = payload
    },
  },
})

export const selectIcrcLedgerId = (state: RootState) => state.icrcLedger.id

export const { setIcrcLedgerId } = icrcLedger.actions
export default icrcLedger.reducer
