import { createSlice } from "@reduxjs/toolkit";

const icpPrice = createSlice({
  name: "icpPrice",
  initialState: {
    icpPrice: "",
    icp24hPriceChange: "",
    icpPriceStatus: null,
    icpPriceError: null,
  },
  reducers: {
    setIcpPrice(state, { payload }) {
      state.icpPrice = payload;
    },
  },
});

const selectIcpPrice = (state) => state.icpPrice.icpPrice;
export { selectIcpPrice };

export const { setIcpPrice } = icpPrice.actions;
export default icpPrice.reducer;
