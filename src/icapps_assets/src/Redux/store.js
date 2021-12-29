import { configureStore } from "@reduxjs/toolkit";
import icpPriceSlice from "./icpPriceSlice";
import searchProjectsSlice from "./searchProjectsSlice";
import searchNftsSlice from "./searchNftsSlice";
import siteDataSlice from "./siteDataSlice";
import projectsFilteringSlice from "./projectsFilteringSlice";
import handleNftDataSlice from "./handleNftDataSlice";


export const store = configureStore({
	reducer: {
		icpPrice: icpPriceSlice,
		siteData: siteDataSlice,
		searchProjects: searchProjectsSlice,
		searchNfts: searchNftsSlice,
		projectsFiltering: projectsFilteringSlice,
		handleNftData: handleNftDataSlice,
	}
})

