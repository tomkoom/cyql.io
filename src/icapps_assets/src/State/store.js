import { configureStore, combineReducers } from "@reduxjs/toolkit";

// reducers
import icpPrice from "./icpPrice";
import siteData from "./siteData";
import searchProjects from "./searchProjects";
import searchNfts from "./searchNfts";
import projectsFiltering from "./projectsFiltering";
import nftItems from "./nftItems";
import theme from "./theme";
import view from "./view";
import loadMore from "./loadMore";

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
	icpPrice,
	siteData,
	searchProjects,
	searchNfts,
	projectsFiltering,
	nftItems,
	theme,
	view,
	loadMore,
});

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ["theme", "searchProjects", "searchNfts", "projectsFiltering", "view"]
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

