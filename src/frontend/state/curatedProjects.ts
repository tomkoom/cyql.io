import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"
import { Project } from "@/state/_types/curated_projects_types"

interface CuratedProjectsState {
  isLoading: boolean
  allCuratedProjects: Project[]
  allCuratedProjectsNum: number
  activeCuratedProjectsNum: number
}

const initialState: CuratedProjectsState = {
  isLoading: false,
  allCuratedProjects: [],
  allCuratedProjectsNum: 0,
  activeCuratedProjectsNum: 0,
}

const curatedProjects = createSlice({
  name: "curatedProjects",
  initialState,
  reducers: {
    setCuratedProjectsIsLoading(state, { payload }: PayloadAction<boolean>) {
      state.isLoading = payload
    },
    setAllCuratedProjects(state, { payload }: PayloadAction<Project[]>) {
      state.allCuratedProjects = payload
      state.allCuratedProjectsNum = payload.length
    },
    setActiveCuratedProjectsNum(state, { payload }: PayloadAction<number>) {
      state.activeCuratedProjectsNum = payload
    },
  },
})

export const selectCuratedProjectsIsLoading = (state: RootState) => state.curatedProjects.isLoading
export const selectAllCuratedProjects = (state: RootState) =>
  state.curatedProjects.allCuratedProjects
export const selecttAllCuratedProjectsNum = (state: RootState) =>
  state.curatedProjects.allCuratedProjectsNum
export const selectActiveCuratedProjectsNum = (state: RootState) =>
  state.curatedProjects.activeCuratedProjectsNum

export const { setCuratedProjectsIsLoading, setAllCuratedProjects, setActiveCuratedProjectsNum } =
  curatedProjects.actions
export default curatedProjects.reducer
