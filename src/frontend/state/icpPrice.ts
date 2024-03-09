import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"
import { PRICE_URL } from "@/constants/constants"

export const fetch = createAsyncThunk("icpPrice/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(PRICE_URL)
    // err
    if (!res.ok) throw new Error("Err")

    // ok
    const data = await res.json()
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const icpPrice = createSlice({
  name: "icpPrice",
  initialState: {
    icpPrice: "",
    icp24hPriceChange: "",
    status: null,
    error: null,
  },
  reducers: {},
  // https://redux-toolkit.js.org/api/createSlice#the-extrareducers-builder-callback-notation
  extraReducers: (builder) => {
    builder
      .addCase(fetch.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetch.fulfilled, (state, { payload }) => {
        state.status = "resolved"
        state.icpPrice = payload["internet-computer"].usd
        state.icp24hPriceChange = payload["internet-computer"].usd_24h_change
      })
      .addCase(fetch.rejected, (state, { payload }) => {
        state.status = "rejected"
        state.error = payload
      })
  },
})

export const selectIcpPrice = (state: RootState) => state.icpPrice.icpPrice
export const selectIcp24hPriceChange = (state: RootState) => state.icpPrice.icp24hPriceChange

export default icpPrice.reducer
