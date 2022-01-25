import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import k from "../../../../k/k";

export const fetchIcpPrice = createAsyncThunk(
  "icpPrice/fetchIcpPrice",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(k.COINGECKO);
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

const icpPriceSlise = createSlice({
  name: "icpPrice",
  initialState: {
    icpPrice: "",
    icp24hPriceChange: { value: "" },
    icpPriceStatus: null,
    icpPriceError: null
  },
  // reducers: {},
  extraReducers: {
    [fetchIcpPrice.pending]: (state) => {
      state.icpPriceStatus = 'loading';
      state.icpPriceError = null;
    },
    [fetchIcpPrice.fulfilled]: (state, { payload }) => {
      state.icpPriceStatus = "resolved";
      state.icpPrice = payload["internet-computer"].usd;
      state.icp24hPriceChange.value = payload["internet-computer"].usd_24h_change;
    },
    [fetchIcpPrice.rejected]: (state, action) => {
      state.icpPriceStatus = "rejected";
      state.icpPriceError = action.payload;
    },
  }
});

export const { } = icpPriceSlise.actions;
export default icpPriceSlise.reducer;