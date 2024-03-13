import { configureStore } from "@reduxjs/toolkit"
import template from "./_template"

// ...
import icpPrice from "./icpPrice"
import theme from "./theme"
import loadMore from "./loadMore"
import adminSearch from "./admin/adminSearch"
import allCategories from "./categories/allCategories"
import categoriesSortedByNum from "./categories/categoriesSortedByNum"
import user from "./user"
import listProject from "./projectProposal"
import proposedProjectCategories from "./categories/proposedProjectCategories"

// dao
import proposals from "./dao/proposals"

// modals
import nftModal from "./modals/nftModal"
import promoModal from "./modals/promoModal"
import shareModal from "./modals/shareModal"
import loading from "./loading"
import projectModal from "./modals/projectModal"
import signInModal from "./modals/signInModal"
import withdrawModal from "./modals/withdrawModal"
import withdrawNftModal from "./modals/withdrawNftModal"
import listConfirmModal from "./modals/listConfirmModal"
import proposalModal from "./modals/proposalModal"

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
    adminSearch,
    allCategories,
    categoriesSortedByNum,
    user,
    listProject,
    proposedProjectCategories,

    // dao
    proposals,

    // modals
    nftModal,
    promoModal,
    shareModal,
    loading,
    projectModal,
    signInModal,
    withdrawModal,
    withdrawNftModal,
    listConfirmModal,
    proposalModal,

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
