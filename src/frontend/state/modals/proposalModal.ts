import type { RootState } from "@/state/_store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ProposalModalState {
  isOpen: boolean
  proposal: any
}

const initialState: ProposalModalState = {
  isOpen: false,
  proposal: {},
}

const proposalModal = createSlice({
  name: "proposalModal",
  initialState,
  reducers: {
    setProposalModalIsOpen(state, { payload }: PayloadAction<boolean>) {
      state.isOpen = payload
    },
    setProposalModalData(state, { payload }: PayloadAction<any>) {
      state.proposal = payload
    },
  },
})

export const selectProposalModalIsOpen = (state: RootState) => state.proposalModal.isOpen
export const selectProposalModalData = (state: RootState) => state.proposalModal.proposal

export const { setProposalModalIsOpen, setProposalModalData } = proposalModal.actions
export default proposalModal.reducer
