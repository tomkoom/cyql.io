import type { RootState } from "@/state/_store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SearchQState {
  searchQ: string
}

const initialState: SearchQState = {
  searchQ: "",
}

const searchQ = createSlice({
  name: "searchQ",
  initialState,
  reducers: {
    setSearchQ(state, { payload }: PayloadAction<string>) {
      state.searchQ = payload
    },
  },
})

export const selectSearchQ = (state: RootState) => state.searchQ.searchQ

export const { setSearchQ } = searchQ.actions
export default searchQ.reducer
