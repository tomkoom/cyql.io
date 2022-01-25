import { createSlice } from "@reduxjs/toolkit";

const siteData = createSlice({
	name: "siteData",
	initialState: {
		projects: { value: [] },
		projectsNum: { value: null },
		upcomingNfts: { value: [] },
		upcomingNftsNum: { value: null },
		nftList: { value: [] },
	},
	reducers: {
		setProjects(state, { payload }) {
			state.projects.value = payload.value;
			state.projectsNum.value = payload.value.length;
		},
		setUpcomingNfts(state, { payload }) {
			state.upcomingNfts.value = payload.value;
			state.upcomingNftsNum.value = payload.value.length;
		},
		setNftList(state, { payload }) {
			state.nftList.value = payload.value;
		},
	},
});

export const { setProjects, setUpcomingNfts, setNftList } = siteData.actions;
export default siteData.reducer;