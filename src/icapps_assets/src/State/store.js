import { combineReducers, configureStore } from "@reduxjs/toolkit";

// reducers
import icpPrice from "./icpPrice";
import search from "./search";
import theme from "./theme";
import view from "./view";
import loadMore from "./loadMore";
import projects from "./projects";
import modals from "./modals";
import projectModal from "./projectModal";
import category from "./category";
import categories from "./categories";
import upvotedProjects from "./upvotedProjects";
import sort from "./sort";
import profile from "./profile";
import filter from "./filter";

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
  view,
  loadMore,
  projects,
  modals,
  projectModal,
  category,
  categories,
  upvotedProjects,
  sort,
  profile,
  filter,
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
