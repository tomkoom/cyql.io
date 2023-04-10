import { combineReducers, configureStore } from "@reduxjs/toolkit";

// api
import icpPrice from "./api/icpPrice";

// modals
import categories from "./modals/categories";
import modals from "./modals/modals";
import nftModal from "./modals/nftModal";
import projectModal from "./modals/projectModal";
import shareModal from "./modals/shareModal";

// profiles
import profiles from "./profiles/profiles";

// projects
import category from "./projects/category";
import filter from "./projects/filter";
import search from "./projects/search";
import sort from "./projects/sort";

// juno
import junoProjects from "./junoProjects";

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
  projectModal,
  category,
  categories,
  sort,
  profile,
  filter,
  projectSubmission,
  profiles,
  shareModal,
  nftModal,

  // projects
  junoProjects,
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
