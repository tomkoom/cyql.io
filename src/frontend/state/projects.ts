import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"
import { ProjectData } from "../../declarations/backend/backend.did"

interface ProjectsState {
  loading: boolean
  allProjects: ProjectData[]
  activeProjects: ProjectData[]
  allProjectsNum: number
  activeProjectsNum: number
}

const initialState: ProjectsState = {
  loading: false,
  allProjects: [],
  activeProjects: [],
  allProjectsNum: 0,
  activeProjectsNum: 0,
}

const projects = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjectsLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload
    },
    setAllProjects(state, { payload }: PayloadAction<ProjectData[]>) {
      state.allProjects = payload
    },
    setActiveProjects(state, { payload }: PayloadAction<ProjectData[]>) {
      state.activeProjects = payload
    },
    setAllProjectsNum(state, { payload }: PayloadAction<number>) {
      state.allProjectsNum = payload
    },
    setActiveProjectsNum(state, { payload }: PayloadAction<number>) {
      state.activeProjectsNum = payload
    },
  },
})

const selectProjectsLoading = (state: RootState) => state.projects.loading
const selectAllProjects = (state: RootState) => state.projects.allProjects
const selectActiveProjects = (state: RootState) => state.projects.activeProjects
const selecttAllProjectsNum = (state: RootState) => state.projects.allProjectsNum
const selectActiveProjectsNum = (state: RootState) => state.projects.activeProjectsNum
export {
  selectProjectsLoading,
  selectAllProjects,
  selectActiveProjects,
  selecttAllProjectsNum,
  selectActiveProjectsNum,
}

export const {
  setProjectsLoading,
  setAllProjects,
  setActiveProjects,
  setAllProjectsNum,
  setActiveProjectsNum,
} = projects.actions
export default projects.reducer
