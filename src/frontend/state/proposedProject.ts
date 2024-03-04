import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

interface ProposedProjectState {
  category: string[]
  isTokenized: boolean
}

const initialState: ProposedProjectState = {
  category: [],
  isTokenized: false,
}

const proposedProject = createSlice({
  name: "proposedProject",
  initialState,
  reducers: {
    setProposedProjectCategory(state, { payload }: PayloadAction<string[]>) {
      state.category = payload
    },
  },
})

const selectProposedProject = (state: RootState) => state.proposedProject
export { selectProposedProject }

export const { setProposedProjectCategory } = proposedProject.actions
export default proposedProject.reducer
