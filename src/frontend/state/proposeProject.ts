import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

interface ProposeProjectState {
  category: string[]
}

const initialState: ProposeProjectState = {
  category: [],
}

const proposeProject = createSlice({
  name: "proposeProject",
  initialState,
  reducers: {
    setProposeProjectCategory(state, { payload }: PayloadAction<string[]>) {
      state.category = payload
    },
  },
})

const selectProposeProject = (state: RootState) => state.proposeProject
export { selectProposeProject }

export const { setProposeProjectCategory } = proposeProject.actions
export default proposeProject.reducer
