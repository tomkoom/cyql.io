import { createSlice } from "@reduxjs/toolkit";

const siteDataSlice = createSlice({
	name: "siteData",
	initialState: {
		projects: [],
		ads: [],
		nftList: [],
		devResources: [],
	},
	reducers: {
		setProjects(state, action) {
			state.projects = action.payload.data;
		},
		setAds(state, action) {
			state.ads = action.payload.data;
		},
		setNftList(state, action) {
			state.nftList = action.payload.data;
		},
		setDevResources(state, action) {
			state.devResources = action.payload.data;
		},
	},
});

export const { setProjects, setAds, setNftList, setDevResources, } = siteDataSlice.actions;
export default siteDataSlice.reducer;