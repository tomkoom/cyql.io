import { createSlice } from "@reduxjs/toolkit";

const siteDataSlice = createSlice({
	name: "siteData",
	initialState: {
		projects: [],
		ads: [],
		nftList: [],
		filteredProjects: [],
	},
	reducers: {
		setProjects(state, action) {
			state.projects = action.payload;
		},
		setAds(state, action) {
			state.ads = action.payload;
		},
		setNftList(state, action) {
			state.nftList = action.payload;
		},
		setFilteredProjects(state, action) {
			state.filteredProjects = action.payload;
		},
	},
});

export const { setProjects, setAds, setNftList, setFilteredProjects } = siteDataSlice.actions;
export default siteDataSlice.reducer;