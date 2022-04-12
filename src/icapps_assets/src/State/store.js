import { combineReducers, configureStore } from "@reduxjs/toolkit";

// reducers
import icpPrice from "./icpPrice";
import siteData from "./siteData";
import searchProjects from "./searchProjects";
import projectsFiltering from "./projectsFiltering";
import searchNfts from "./searchNfts";
import theme from "./theme";
import view from "./view";
import loadMore from "./loadMore";

// redux-persist
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  icpPrice,
  siteData,
  searchProjects,
  projectsFiltering,
  searchNfts,
  theme,
  view,
  loadMore,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme", "view"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
