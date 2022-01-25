import { createSlice } from "@reduxjs/toolkit";

const searchNftsSlice = createSlice({
	name: "searchNfts",
	initialState: {
		search: { value: "" },
	},
	reducers: {
		setSearchNfts(state, { payload }) {
			state.value = payload;
		}
	},
});

export const { setSearchNfts } = searchNftsSlice.actions;
export default searchNftsSlice.reducer;