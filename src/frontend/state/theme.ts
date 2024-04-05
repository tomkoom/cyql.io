import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

interface ThemeState {
  theme: { value: string }
}

const initialState: ThemeState = {
  theme: { value: "dark" },
}

const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, { payload }: PayloadAction<{ value: string }>) {
      state.theme.value = payload.value
    },
  },
})

export const selectTheme = (state: RootState) => state.theme.theme.value

export const { setTheme } = theme.actions
export default theme.reducer
