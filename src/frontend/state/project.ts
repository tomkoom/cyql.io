import type { RootState } from "@/state/_store"
import type { Project } from "@/state/types/Project"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ProjectState {
  project: Project
  relatedProjects: Project[]
}

const initialState: ProjectState = {
  project: null,
  relatedProjects: [],
}

const project = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject(state, { payload }: PayloadAction<Project>) {
      state.project = payload
    },
    setProjectRelated(state, { payload }: PayloadAction<Project[]>) {
      state.relatedProjects = payload
    },
    setProjectClear(state) {
      state.project = initialState.project
      state.relatedProjects = initialState.relatedProjects
    },
  },
})

export const selectProject = (state: RootState) => state.project

export const { setProject, setProjectRelated, setProjectClear } = project.actions
export default project.reducer
