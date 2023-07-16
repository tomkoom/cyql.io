import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/state/_store";
import type { PromoModalData } from "../_types/promoModalData";

interface PromoModalState {
  promoModal: boolean;
  data: PromoModalData;
}

const initialState: PromoModalState = {
  promoModal: false,
  data: {
    color: "",
    backgroundColor: "",
    title: "",
    text: "",
    ctaUrl: "",
    ctaText: "",
  },
};

const promoModal = createSlice({
  name: "promoModal",
  initialState,
  reducers: {
    setPromoModal(state, { payload }: PayloadAction<boolean>) {
      state.promoModal = payload;
    },
    setPromoModalData(state, { payload }: PayloadAction<PromoModalData>) {
      state.data = payload;
    },
    setClearPromoModalData(state) {
      state.data = initialState.data;
    },
  },
});

const selectPromoModal = (state: RootState) => state.promoModal.promoModal;
const selectPromoModalData = (state: RootState) => state.promoModal.data;
export { selectPromoModal, selectPromoModalData };

export const { setPromoModal, setPromoModalData, setClearPromoModalData } = promoModal.actions;
export default promoModal.reducer;
