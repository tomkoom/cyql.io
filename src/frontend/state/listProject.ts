import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

interface ListProjectState {
  category: string[]
  token: { ledgerId: string; standard: string }
}

const initialState: ListProjectState = {
  category: [],
  token: { ledgerId: "", standard: "" },
}

const listProject = createSlice({
  name: "listProject",
  initialState,
  reducers: {
    setListProjectCategory(state, { payload }: PayloadAction<string[]>) {
      state.category = payload
    },
    setListProjectTokenLedgerId(state, { payload }: PayloadAction<string>) {
      state.token.ledgerId = payload
    },
    setListProjectTokenStandard(state, { payload }: PayloadAction<string>) {
      state.token.standard = payload
    },
  },
})

export const selectListProject = (state: RootState) => state.listProject

export const { setListProjectCategory } = listProject.actions
export default listProject.reducer
