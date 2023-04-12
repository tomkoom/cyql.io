import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const coingeckoApiUrl =
  "https://api.coingecko.com/api/v3/simple/price?ids=internet-computer&vs_currencies=usd&include_24hr_change=true";

export const fetchIcpPrice = createAsyncThunk(
  "icpPrice/fetchIcpPrice",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(coingeckoApiUrl);
      // if err
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
  // https://redux-toolkit.js.org/api/createSlice#the-extrareducers-builder-callback-notation
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
