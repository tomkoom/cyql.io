import { createSlice } from "@reduxjs/toolkit";

const searchNftsSlice = createSlice({
    name: "searchNfts",
    initialState: {
        value: "",
    },
    reducers: {
        setSearchNfts(state, action) {
            state.value = action.payload;
        }
    },
});

export const { setSearchNfts } = searchNftsSlice.actions;
export default searchNftsSlice.reducer;