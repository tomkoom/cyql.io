import { createSlice } from "@reduxjs/toolkit";

const modals = createSlice({
  name: "modals",
  initialState: {
    signInModal: false,
    mobileMenuModal: false,
  },
  reducers: {
    setSignInModal(state, { payload }) {
      state.signInModal = payload;
    },
    setMobileMenuModal(state, { payload }) {
      state.mobileMenuModal = payload;
    },
  },
});

const selectSignInModal = (state) => state.modals.signInModal;
const selectMobileMenuModal = (state) => state.modals.mobileMenuModal;
export { selectSignInModal, selectMobileMenuModal };

export const { setSignInModal, setMobileMenuModal } = modals.actions;
export default modals.reducer;
