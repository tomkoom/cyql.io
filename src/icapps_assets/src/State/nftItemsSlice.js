import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleNftData } from "./nftItemsFunc";

const formatter = new Intl.NumberFormat("en-US");
const formatterUsd = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

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

		const nftData = handleNftData(
			nftItemMarketDataText,
			nftListItem,
			nftListLength,
			icpPrice
		);

		return nftData;
	}
);

const nftItemsSlice = createSlice({
	name: "nftItems",
	initialState: {
		nftItems: [],
		totalVolumeInUsd: "",
		totalVolumeInIcp: "",
		totalMarketCapInUsd: "",
		totalMarketCapInIcp: "",
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
			state.status = "resolved";
			state.nftItems = action.payload;

			// set market cap and total volume
			if (action.payload) {
				state.totalVolumeInUsd = formatterUsd.format(
					action.payload.reduce((acc, val) => {
						return acc + val.volumeInUsd;
					}, 0)
				);

				state.totalVolumeInIcp = formatter.format(
					action.payload.reduce((acc, val) => {
						return acc + val.salesInIcp;
					}, 0)
				);

				state.totalMarketCapInUsd = formatterUsd.format(
					action.payload.reduce((acc, val) => {
						return acc + val.marketCapInUsd;
					}, 0)
				);

				state.totalMarketCapInIcp = formatter.format(
					action.payload.reduce((acc, val) => {
						return acc + val.marketCapInIcp;
					}, 0)
				);
			}
		},
		[fetchNftData.rejected]: (state, action) => {
			// state.status = "rejected";
			// state.error = action.payload;
		},
	}
});

export const { } = nftItemsSlice.actions;
export default nftItemsSlice.reducer;