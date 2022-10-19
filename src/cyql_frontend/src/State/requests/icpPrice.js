import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { c } from "../../../../../constants/constants";

const COINGECKO_API = c.COINGECKO_API;

export const fetchIcpPrice = createAsyncThunk(
  "icpPrice/fetchIcpPrice",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(COINGECKO_API);
      // if error
      if (!res.ok) {
        throw new Error("Err");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const icpPriceSlice = createSlice({
  name: "icpPrice",
  initialState: {
    icpPrice: "",
    icp24hPriceChange: "",
    icpPriceStatus: null,
    icpPriceError: null,
  },
  // reducers: {},
  extraReducers: {
    [fetchIcpPrice.pending]: (state) => {
      state.icpPriceStatus = "loading";
      state.icpPriceError = null;
    },
    [fetchIcpPrice.fulfilled]: (state, { payload }) => {
      state.icpPriceStatus = "resolved";
      state.icpPrice = payload["internet-computer"].usd;
      state.icp24hPriceChange = payload["internet-computer"].usd_24h_change;
    },
    [fetchIcpPrice.rejected]: (state, { payload }) => {
      state.icpPriceStatus = "rejected";
      state.icpPriceError = payload;
    },
  },
});

export const selectIcpPrice = (state) => state.icpPrice.icpPrice;
export const selectIcp24hPriceChange = (state) => state.icpPrice.icp24hPriceChange;

export default icpPriceSlice.reducer;
