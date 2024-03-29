import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"
import { Project } from "@/state/_types/types"

interface ProjectsState {
  loading: boolean
  allProjects: Project[]
  allProjectsNum: number
  activeProjects: Project[]
  activeProjectsNum: number
}

const initialState: ProjectsState = {
  loading: false,
  allProjects: [],
  allProjectsNum: 0,
  activeProjects: [],
  activeProjectsNum: 0,
}

const projects = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjectsLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload
    },
    setAllProjects(state, { payload }: PayloadAction<Project[]>) {
      state.allProjects = payload
    },
    setAllProjectsNum(state, { payload }: PayloadAction<number>) {
      state.allProjectsNum = payload
    },
    setActiveProjects(state, { payload }: PayloadAction<Project[]>) {
      state.activeProjects = payload
    },
    setActiveProjectsNum(state, { payload }: PayloadAction<number>) {
      state.activeProjectsNum = payload
    },
  },
})

const selectProjectsLoading = (state: RootState) => state.projects.loading
const selectAllProjects = (state: RootState) => state.projects.allProjects
const selecttAllProjectsNum = (state: RootState) => state.projects.allProjectsNum
const selectActiveProjects = (state: RootState) => state.projects.activeProjects
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
