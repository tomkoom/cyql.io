import { createSlice } from "@reduxjs/toolkit";

const nftModal = createSlice({
  name: "nftModal",
  initialState: {
    nftModal: false,
  },
  reducers: {
    setNftModal(state, { payload }) {
      state.nftModal = payload;
    },
  },
});

const selectNftModal = (state) => state.nftModal.nftModal;
export { selectNftModal };

export const { setNftModal } = nftModal.actions;
export default nftModal.reducer;
