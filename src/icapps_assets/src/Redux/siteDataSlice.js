import { createSlice } from "@reduxjs/toolkit";

const siteDataSlice = createSlice({
	name: "siteData",
	initialState: {
		projects: [],
		projectsNum: { value: null },
		nftsNum: { value: null },
		ads: [],
		nftList: [],
		upcomingNfts: [],
		upcomingNftsNum: { value: null },
		devResources: [],
	},
	reducers: {
		setProjects(state, action) {
			state.projects = action.payload.data;
			state.projectsNum.value = action.payload.data.length;
			state.nftsNum.value = action.payload.data.filter(project => project.category === "NFTs").length;
		},
		setAds(state, action) {
			state.ads = action.payload.data;
		},
		setNftList(state, action) {
			state.nftList = action.payload.data;
		},
		setUpcomingNfts(state, action) {
			state.upcomingNfts = action.payload.data;
			state.upcomingNftsNum.value = action.payload.data.length;
		},
		setDevResources(state, action) {
			state.devResources = action.payload.data;
		},
	},
});

export const { setProjects, setAds, setNftList, setUpcomingNfts, setDevResources, } = siteDataSlice.actions;
export default siteDataSlice.reducer;