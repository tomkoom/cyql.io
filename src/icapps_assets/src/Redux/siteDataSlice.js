import { createSlice } from "@reduxjs/toolkit";

const siteDataSlice = createSlice({
	name: "siteData",
	initialState: {
		projects: [],
		ads: [],
		nftList: [],
		upcomingNfts: [],
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
		setUpcomingNfts(state, action) {
			state.upcomingNfts = action.payload.data.sort((a) => (a["Type"] === "Promoted" ? -1 : 0));
		},
		setDevResources(state, action) {
			state.devResources = action.payload.data;
		},
	},
});

export const { setProjects, setAds, setNftList, setUpcomingNfts, setDevResources, } = siteDataSlice.actions;
export default siteDataSlice.reducer;