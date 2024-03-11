import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

interface ListConfirmModalState {
  isOpen: boolean
}

const initialState: ListConfirmModalState = {
  isOpen: false,
}

const listConfirmModal = createSlice({
  name: "listConfirmModal",
  initialState,
  reducers: {
    setListConfirmModalIsOpen(state, { payload }: PayloadAction<boolean>) {
      state.isOpen = payload
    },
  },
})

export const selectListConfirmModalIsOpen = (state: RootState) => state.listConfirmModal.isOpen

export const { setListConfirmModalIsOpen } = listConfirmModal.actions
export default listConfirmModal.reducer
