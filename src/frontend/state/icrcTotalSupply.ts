import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

interface IcrcTotalSupplyState {
  icrcTotalSupply: string
}

const initialState: IcrcTotalSupplyState = {
  icrcTotalSupply: "",
}

const icrcTotalSupply = createSlice({
  name: "icrcTotalSupply",
  initialState,
  reducers: {
    // ...
    setIcrcTotalSupply(state, { payload }: PayloadAction<string>) {
      state.icrcTotalSupply = payload
    },
  },
})

export const selectIcrcTotalSupply = (state: RootState) => state.icrcTotalSupply.icrcTotalSupply

export const { setIcrcTotalSupply } = icrcTotalSupply.actions
export default icrcTotalSupply.reducer
