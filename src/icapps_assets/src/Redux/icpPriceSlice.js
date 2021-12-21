import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import k from "../../../../k/k";

export const fetchIcpPrice = createAsyncThunk(
  "icpPrice/fetchIcpPrice",
  async function () {
    const response = await fetch(k.COINGECKO);
    const data = response.json();
    return data;
  }
);

const icpPriceSlise = createSlice({
  name: "icpPrice",
  initialState: { value: "123" },
  // reducers: {},
  extraReducers: {
    [fetchIcpPrice.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchIcpPrice.fulfilled]: (state, action) => {
      state.status = "resolved";
      const icpPrice = action.payload["internet-computer"].usd;
      state.value = icpPrice; // ?
    },
    [fetchIcpPrice.rejected]: (state, action) => {

    },
  }
});

export const { } = icpPriceSlise.actions;
export default icpPriceSlise.reducer;