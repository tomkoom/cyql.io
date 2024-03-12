import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

interface ProposalsState {
  proposals: any[]
}

const initialState: ProposalsState = {
  proposals: [],
}

const proposals = createSlice({
  name: "proposals",
  initialState,
  reducers: {
    setProposals(state, { payload }: PayloadAction<any[]>) {
      state.proposals = payload
    },
  },
})

const selectProposals = (state: RootState) => state.proposals.proposals
export { selectProposals }

export const { setProposals } = proposals.actions
export default proposals.reducer
