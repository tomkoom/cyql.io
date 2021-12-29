import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleNftData } from "./handleNftDataFunc";

export const fetchNftData = createAsyncThunk("handleNftData/fetchNftData",
	// add no canister scenario
	async ({
		nftListItemCanister,
		nftListItem,
		nftListLength,
		icpPrice,
	}, { rejectWithValue }) => {

		const nftItemMarketDataText = await fetch(nftListItemCanister)
			.then((res) => res.text())
			.then((nftItemMarketDataText) => { return nftItemMarketDataText });

		const nftItemsData = handleNftData(
			nftItemMarketDataText,
			nftListItem,
			nftListLength,
			icpPrice
		);

		return nftItemsData;
	}
);

const handleNftDataSlice = createSlice({
	name: "handleNftData",
	initialState: {
		nftData: [],
		status: null,
		error: null
	},
	// reducers: {},
	extraReducers: {
		[fetchNftData.pending]: (state) => {
			// state.status = 'loading';
			// state.error = null;
		},
		[fetchNftData.fulfilled]: (state, action) => {
			// state.status = "resolved";
			state.nftData = action.payload;
		},
		[fetchNftData.rejected]: (state, action) => {
			// state.status = "rejected";
			// state.error = action.payload;
		},
	}
});

export const { } = handleNftDataSlice.actions;
export default handleNftDataSlice.reducer;