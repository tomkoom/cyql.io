import { combineReducers, configureStore } from "@reduxjs/toolkit";

// reducers
import icpPrice from "./icpPrice";
import search from "./search";
import theme from "./theme";
import view from "./view";
import loadMore from "./loadMore";
import projects from "./projects";
import category from "./category";
import signInModal from "./signInModal";

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
  category,
  signInModal,
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
