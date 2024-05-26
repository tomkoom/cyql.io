import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"
import { ProjectV2 } from "@/state/_types/curated_projects_types"

interface CuratedProjectsState {
  isLoading: boolean
  allCuratedProjects: ProjectV2[]
  allCuratedProjectsNum: number
  activeCuratedProjects: ProjectV2[]
  activeCuratedProjectsNum: number
}

const initialState: CuratedProjectsState = {
  isLoading: false,
  allCuratedProjects: [],
  allCuratedProjectsNum: 0,
  activeCuratedProjects: [],
  activeCuratedProjectsNum: 0,
}

const curatedProjects = createSlice({
  name: "curatedProjects",
  initialState,
  reducers: {
    setCuratedProjectsIsLoading(state, { payload }: PayloadAction<boolean>) {
      state.isLoading = payload
    },
    setAllCuratedProjects(state, { payload }: PayloadAction<ProjectV2[]>) {
      state.allCuratedProjects = payload
      state.allCuratedProjectsNum = payload.length
    },
    setActiveCuratedProjects(state, { payload }: PayloadAction<ProjectV2[]>) {
      state.activeCuratedProjects = payload
      state.activeCuratedProjectsNum = payload.length
    },
  },
})

export const selectCuratedProjectsIsLoading = (state: RootState) => state.curatedProjects.isLoading
export const selectAllCuratedProjects = (state: RootState) =>
  state.curatedProjects.allCuratedProjects
export const selecttAllCuratedProjectsNum = (state: RootState) =>
  state.curatedProjects.allCuratedProjectsNum
export const selectActiveCuratedProjects = (state: RootState) =>
  state.curatedProjects.activeCuratedProjects
export const selectActiveCuratedProjectsNum = (state: RootState) =>
  state.curatedProjects.activeCuratedProjectsNum

export const { setCuratedProjectsIsLoading, setAllCuratedProjects, setActiveCuratedProjects } =
  curatedProjects.actions
export default curatedProjects.reducer