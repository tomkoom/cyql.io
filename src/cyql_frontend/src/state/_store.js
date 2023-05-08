import { combineReducers, configureStore } from "@reduxjs/toolkit";

// admin
import adminSearch from "./admin/adminSearch";

// api
import icpPrice from "./api/icpPrice";

// modals
import modals from "./modals/modals";
import nftModal from "./modals/nftModal";
import shareModal from "./modals/shareModal";

// project modal
import projectModal from "./modals/projectModal/projectModal";
import projectModalLoading from "./modals/projectModal/projectModalLoading";

// projects
import category from "./projects/category";
import filter from "./projects/filter";
import search from "./projects/search";
import sort from "./projects/sort";
import projects from "./projects";

// submit
import submit from "./submit/submit";

// categories
import allCategories from "./categories/allCategories";
import categoriesSortedByNum from "./categories/categoriesSortedByNum";

// ui
import theme from "./ui/theme";
import loadMore from "./ui/loadMore";

// profile
import profile from "./profile/profile";

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

  // profile
  profile,

  // modals
  modals,
  shareModal,
  nftModal,

  // ui
  theme,
  loadMore,

  // project modal
  projectModal,
  projectModalLoading,

  // admin
  adminSearch,

  // projects
  category,
  filter,
  search,
  sort,
  projects,

  // submit
  submit,

  // categories
  allCategories,
  categoriesSortedByNum,
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
