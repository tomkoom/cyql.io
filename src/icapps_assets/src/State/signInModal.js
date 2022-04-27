import { createSlice } from "@reduxjs/toolkit";

const signInModal = createSlice({
  name: "signInModal",
  initialState: {
    signInModal: false,
  },
  reducers: {
    setSignInModal(state, { payload }) {
      state.signInModal = payload;
    },
  },
});

export const selectSignInModal = (state) => state.signInModal.signInModal;

export const { setSignInModal } = signInModal.actions;
export default signInModal.reducer;
