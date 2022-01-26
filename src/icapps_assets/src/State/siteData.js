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
		setProjects({ projects, projectsNum }, { payload }) {
			projects.value = payload.value;
			projectsNum.value = payload.value.length;
		},
		setUpcomingNfts({ upcomingNfts, upcomingNftsNum }, { payload }) {
			upcomingNfts.value = payload.value;
			upcomingNftsNum.value = payload.value.length;
		},
		setNftList({ nftList }, { payload }) {
			nftList.value = payload.value;
		},
	},
});

export const { setProjects, setUpcomingNfts, setNftList } = siteData.actions;
export default siteData.reducer;