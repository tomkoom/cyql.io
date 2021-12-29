import { createSlice } from "@reduxjs/toolkit";

const nftDataSlice = createSlice({
	name: "nftData",
	initialState: {
		nftData: [],
	},
	reducers: {
		setNftData(state, action) {
			state.nftData = action.payload;
		},
	},
});

export const { setNftData } = nftDataSlice.actions;
export default nftDataSlice.reducer;