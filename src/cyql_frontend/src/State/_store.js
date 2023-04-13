import { combineReducers, configureStore } from "@reduxjs/toolkit";

// admin
import adminSearch from "./admin/adminSearch";

// api
import icpPrice from "./api/icpPrice";

// modals
import categories from "./modals/categories";
import modals from "./modals/modals";
import nftModal from "./modals/nftModal";

import shareModal from "./modals/shareModal";

// project modal
import projectModal from "./modals/projectModal/projectModal";
import projectModalLoading from "./modals/projectModal/projectModalLoading";

// profiles
import profiles from "./profiles/profiles";

// projects
import category from "./projects/category";
import filter from "./projects/filter";
import search from "./projects/search";
import sort from "./projects/sort";
import projects from "./projects";

// ...
import theme from "./theme";
import loadMore from "./loadMore";
import profile from "./profile/profile";
import projectSubmission from "./projectSubmission";

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
  search,
  theme,
  loadMore,
  modals,

  category,
  categories,
  sort,
  profile,
  filter,
  projectSubmission,
  profiles,
  shareModal,
  nftModal,

  // project modal
  projectModal,
  projectModalLoading,

  // admin
  adminSearch,

  // projects
  projects,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme"],
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
