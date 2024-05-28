import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"
import type { Project } from "@/state/_types/curated_projects_types"

interface ProjectState {
  project: Project
}

const initialState: ProjectState = {
  project: null,
}

const project = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject(state, { payload }: PayloadAction<Project>) {
      state.project = payload
    },
  },
})

export const selectProject = (state: RootState) => state.project.project

export const { setProject } = project.actions
export default project.reducer
