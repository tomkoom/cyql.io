import { configureStore } from "@reduxjs/toolkit"
import template from "./_template"

// ...
import icpPrice from "./icpPrice"
import theme from "./theme"
import loadMore from "./loadMore"
import adminSearch from "./admin/adminSearch"
import submit from "./submit/submit"
import allCategories from "./categories/allCategories"
import categoriesSortedByNum from "./categories/categoriesSortedByNum"
import profile from "./profile/profile"

// modals
import modals from "./modals/modals"
import nftModal from "./modals/nftModal"
import promoModal from "./modals/promoModal"
import shareModal from "./modals/shareModal"
import loading from "./loading"
import projectModal from "./modals/projectModal"

// projects
import filter from "./projects/filter"
import sort from "./projects/sort"
import projects from "./projects"

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }),
  reducer: {
    template,

    // ...
    icpPrice,
    theme,
    loadMore,
    profile,
    adminSearch,
    submit,
    allCategories,
    categoriesSortedByNum,

    // modals
    modals,
    nftModal,
    promoModal,
    shareModal,
    loading,
    projectModal,

    // projects
    filter,
    sort,
    projects,
  },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
