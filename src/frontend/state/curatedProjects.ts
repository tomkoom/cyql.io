import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

interface CuratedProjectsState {
  activeCuratedProjectsNum: number
}

const initialState: CuratedProjectsState = {
  activeCuratedProjectsNum: 0,
}

const curatedProjects = createSlice({
  name: "curatedProjects",
  initialState,
  reducers: {
    setActiveProjectsNum(state, { payload }: PayloadAction<number>) {
      state.activeCuratedProjectsNum = payload
    },
  },
})

export const selectActiveProjectsNum = (state: RootState) => state.curatedProjects.activeCuratedProjectsNum

export const { setActiveProjectsNum } = curatedProjects.actions
export default curatedProjects.reducer
