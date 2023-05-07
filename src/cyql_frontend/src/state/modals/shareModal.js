import { createSlice } from "@reduxjs/toolkit";

const shareModal = createSlice({
  name: "shareModal",
  initialState: {
    shareModal: false,
  },
  reducers: {
    setShareModal(state, { payload }) {
      state.shareModal = payload;
    },
  },
});

const selectShareModal = (state) => state.shareModal.shareModal;
export { selectShareModal };

export const { setShareModal } = shareModal.actions;
export default shareModal.reducer;
