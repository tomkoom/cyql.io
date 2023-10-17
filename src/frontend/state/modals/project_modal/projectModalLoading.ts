import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

type ProjectModalLoadingState = {
  set: boolean
  del: boolean
}

const initialState: ProjectModalLoadingState = {
  set: false,
  del: false,
}

const projectModalLoading = createSlice({
  name: "projectModalLoading",
  initialState,
  reducers: {
    setProjectModalLoadingSet(state, { payload }: PayloadAction<boolean>) {
      state.set = payload
    },
    setProjectModalLoadingDel(state, { payload }: PayloadAction<boolean>) {
      state.del = payload
    },
  },
})

const selectProjectModalLoadingSet = (state: RootState) => state.projectModalLoading.set
const selectProjectModalLoadingDel = (state: RootState) => state.projectModalLoading.del
export { selectProjectModalLoadingSet, selectProjectModalLoadingDel }

export const { setProjectModalLoadingSet, setProjectModalLoadingDel } = projectModalLoading.actions
export default projectModalLoading.reducer
