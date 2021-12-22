import { configureStore } from "@reduxjs/toolkit";
import icpPriceSlice from "./icpPriceSlice";
import searchProjectsSlice from "./searchProjectsSlice";
import searchNftsSlice from "./searchNftsSlice";

export const store = configureStore({
	reducer: {
		icpPrice: icpPriceSlice,
		searchProjects: searchProjectsSlice,
		searchNfts: searchNftsSlice,
	}
})

