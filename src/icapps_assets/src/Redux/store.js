import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Reducers
import icpPriceSlice from "./icpPriceSlice";
import searchProjectsSlice from "./searchProjectsSlice";
import searchNftsSlice from "./searchNftsSlice";
import siteDataSlice from "./siteDataSlice";
import projectsFilteringSlice from "./projectsFilteringSlice";
import nftItemsSlice from "./nftItemsSlice";
import themeSlice from "./themeSlice";

// redux-persist
import {
	persistStore, persistReducer, FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
	icpPrice: icpPriceSlice,
	siteData: siteDataSlice,
	searchProjects: searchProjectsSlice,
	searchNfts: searchNftsSlice,
	projectsFiltering: projectsFilteringSlice,
	nftItems: nftItemsSlice,
	theme: themeSlice,
});

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ["theme", "searchProjects", "searchNfts", "projectsFiltering"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

export const persistor = persistStore(store);
export default store;

