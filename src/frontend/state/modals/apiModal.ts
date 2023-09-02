import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/state/_store";

interface ApiModalState {
  isOpen: boolean;
}

const initialState: ApiModalState = {
  isOpen: false,
};

const apiModal = createSlice({
  name: "apiModal",
  initialState,
  reducers: {
    setApiModalIsOpen(state, { payload }: PayloadAction<boolean>) {
      state.isOpen = payload;
    },
  },
});

const selectApiModalIsOpen = (state: RootState) => state.apiModal.isOpen;
export { selectApiModalIsOpen };

export const { setApiModalIsOpen } = apiModal.actions;
export default apiModal.reducer;
