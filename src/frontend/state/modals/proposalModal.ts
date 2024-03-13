import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

interface ProposalModalState {
  isOpen: boolean
}

const initialState: ProposalModalState = {
  isOpen: false,
}

const proposalModal = createSlice({
  name: "proposalModal",
  initialState,
  reducers: {
    setProposalModalIsOpen(state, { payload }: PayloadAction<boolean>) {
      state.isOpen = payload
    },
  },
})

export const selectProposalModalIsOpen = (state: RootState) => state.proposalModal.isOpen

export const { setProposalModalIsOpen } = proposalModal.actions
export default proposalModal.reducer
