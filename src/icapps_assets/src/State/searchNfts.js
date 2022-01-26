import { createSlice } from "@reduxjs/toolkit";

const searchNfts = createSlice({
	name: "searchNfts",
	initialState: {
		value: "",
	},
	reducers: {
		setSearchNfts(state, { payload }) {
			state.value = payload;
		}
	},
});

export const { setSearchNfts } = searchNfts.actions;
export default searchNfts.reducer;