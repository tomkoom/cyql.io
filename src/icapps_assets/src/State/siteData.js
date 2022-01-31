import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	projects: { value: [] },
	projectsNum: { value: null },
	upcomingNfts: { value: [] },
	upcomingNftsNum: { value: null },
	nftList: { value: [] },
}

const siteData = createSlice({
	name: "siteData",
	initialState,
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

export const selectProjects = state => state.siteData.projects.value;
export const selectProjectsNum = state => state.siteData.projectsNum.value;
export const selectUpcomingNfts = state => state.siteData.upcomingNfts.value;
export const selectUpcomingNftsNum = state => state.siteData.upcomingNftsNum.value;
export const selectNftList = state => state.siteData.nftList.value;

export const { setProjects, setUpcomingNfts, setNftList } = siteData.actions;
export default siteData.reducer;