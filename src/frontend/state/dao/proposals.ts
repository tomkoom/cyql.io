import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

interface ProposalsState {
  proposals: any[]
  proposalsNum: number
}

const initialState: ProposalsState = {
  proposals: [],
  proposalsNum: 0,
}

const proposals = createSlice({
  name: "proposals",
  initialState,
  reducers: {
    setProposals(state, { payload }: PayloadAction<any[]>) {
      state.proposals = payload
      state.proposalsNum = payload.length
    },
  },
})

export const selectProposals = (state: RootState) => state.proposals.proposals
export const selectProposalsNum = (state: RootState) => state.proposals.proposalsNum

export const { setProposals } = proposals.actions
export default proposals.reducer
