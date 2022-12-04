import { combineReducers, configureStore } from "@reduxjs/toolkit";

// reducers
// api
import icpPrice from "./api/icpPrice";
// ...
import search from "./search";
import theme from "./theme";
import loadMore from "./loadMore";
import projects from "./projects";
import modals from "./modals/modals";
import projectModal from "./modals/projectModal";
import category from "./category";
import categories from "./categories";
import sort from "./sort";
import profile from "./profile";
import filter from "./filter";
import projectSubmission from "./projectSubmission";
import jobs from "./jobs/jobs";
import job from "./jobs/job";
import nft from "./nft/nft";
import profiles from "./profiles/profiles";
import activeTab from "./jobs/activeTab";

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
  projects,
  modals,
  projectModal,
  category,
  categories,
  sort,
  profile,
  filter,
  projectSubmission,
  jobs,
  job,
  nft,
  profiles,
  activeTab,
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
