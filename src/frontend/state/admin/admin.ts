import type { RootState } from "@/state/_store"
import type { Project } from "@/state/types/Project"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { projectInitialState } from "./projectInitialState"

type Mode = "add" | "edit"

interface ProjectItem<T> {
  [key: string]: T
}

interface AdminState {
  isLoading: boolean
  isModalOpen: boolean
  mode: Mode
  project: Project
  // ...
  allProjects: Project[]

  // ...
  searchQ: string
  searchQProjects: Project[]
}

const initialState: AdminState = {
  isLoading: false,
  isModalOpen: false,
  mode: "add",
  project: projectInitialState,

  // ...
  allProjects: [],

  // ...
  searchQ: "",
  searchQProjects: [],
}

const admin = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminIsLoading(state, { payload }: PayloadAction<boolean>) {
      state.isLoading = payload
    },
    setAdminIsModalOpen(state, { payload }: PayloadAction<boolean>) {
      state.isModalOpen = payload
    },
    setAdminMode(state, { payload }: PayloadAction<Mode>) {
      state.mode = payload
    },

    // project
    setAdminProject(state, { payload }: PayloadAction<Project>) {
      state.project = payload
    },
    setAdminProjectItemString(state, { payload }: PayloadAction<ProjectItem<string>>) {
      const key = Object.keys(payload)[0]
      state.project[key] = payload[key]
    },
    setAdminProjectItemArray(state, { payload }: PayloadAction<ProjectItem<Array<any>>>) {
      const key = Object.keys(payload)[0]
      state.project[key] = payload[key]
    },
    setAdminProjectItemBoolean(state, { payload }: PayloadAction<ProjectItem<boolean>>) {
      const key = Object.keys(payload)[0]
      state.project[key] = payload[key]
    },
    setAdminClearProject(state) {
      state.project = projectInitialState
    },

    // ...
    setAdminAllProjects(state, { payload }: PayloadAction<Project[]>) {
      state.allProjects = payload
    },
    setAdminSearchQ(state, { payload }: PayloadAction<string>) {
      state.searchQ = payload
    },
    setAdminSearchQProjects(state, { payload }: PayloadAction<Project[]>) {
      state.searchQProjects = payload
    },
    setAdminCloseModal(state) {
      state.isLoading = false
      state.isModalOpen = false
      state.mode = "add"
      state.project = projectInitialState
    },
  },
})

export const selectAdmin = (state: RootState) => state.admin

export const {
  setAdminIsLoading,
  setAdminIsModalOpen,
  setAdminMode,
  // projects
  setAdminProject,
  setAdminProjectItemString,
  setAdminProjectItemArray,
  setAdminProjectItemBoolean,
  setAdminClearProject,
  // ...
  setAdminAllProjects,
  setAdminSearchQ,
  setAdminSearchQProjects,
  setAdminCloseModal,
} = admin.actions
export default admin.reducer
