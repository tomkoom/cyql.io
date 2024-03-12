import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"
import type { ProjectProposal } from "../../../declarations/backend/backend.did"

interface ProposalsState {
  proposals: ProjectProposal[]
}

const initialState: ProposalsState = {
  proposals: [],
}

const proposals = createSlice({
  name: "proposals",
  initialState,
  reducers: {
    setProposals(state, { payload }: PayloadAction<ProjectProposal[]>) {
      state.proposals = payload
    },
  },
})

const selectProposals = (state: RootState) => state.proposals.proposals
export { selectProposals }

export const { setProposals } = proposals.actions
export default proposals.reducer
