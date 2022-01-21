import { createSlice } from "@reduxjs/toolkit";

const siteDataSlice = createSlice({
	name: "siteData",
	initialState: {
		projects: [],
		projectsNum: { value: null },
		nftsNum: { value: null },
		upcomingNfts2: { value: [] },
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
		setUpcomingNfts2(state, action) {
			state.upcomingNfts2.value = action.payload.data.filter(project => project.nftSaleStatus === "Open" || project.nftSaleStatus === "Over" || project.nftSaleStatus === "Upcoming");
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

export const { setProjects, setUpcomingNfts2, setAds, setNftList, setUpcomingNfts, setDevResources, } = siteDataSlice.actions;
export default siteDataSlice.reducer;