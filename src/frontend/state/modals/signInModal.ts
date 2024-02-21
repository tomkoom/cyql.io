import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

interface SignInModalState {
  isOpen: boolean
}

const initialState: SignInModalState = {
  isOpen: false,
}

const signInModal = createSlice({
  name: "signInModal",
  initialState,
  reducers: {
    setSignInModalIsOpen(state, { payload }: PayloadAction<boolean>) {
      state.isOpen = payload
    },
  },
})

export const selectSignInModalIsOpen = (state: RootState) => state.signInModal.isOpen

export const { setSignInModalIsOpen } = signInModal.actions
export default signInModal.reducer
