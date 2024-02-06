import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

interface LoadingState {
  isLoading: boolean
}

const initialState: LoadingState = {
  isLoading: false,
}

const loading = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setIsLoading(state, { payload }: PayloadAction<boolean>) {
      state.isLoading = payload
    },
  },
})

const selectIsLoading = (state: RootState) => state.loading.isLoading
export { selectIsLoading }

export const { setIsLoading } = loading.actions
export default loading.reducer
