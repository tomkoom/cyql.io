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

const selectJobModal = (state) => state.modals.jobModal;
const selectSignInModal = (state) => state.modals.signInModal;
const selectMobileMenuModal = (state) => state.modals.mobileMenuModal;
export { selectJobModal, selectSignInModal, selectMobileMenuModal };

export const { setJobModal, setSignInModal, setMobileMenuModal } = modals.actions;
export default modals.reducer;
