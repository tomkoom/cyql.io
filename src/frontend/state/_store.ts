import { configureStore } from "@reduxjs/toolkit"
import template from "./_template"

// ...
import icpPrice from "./icpPrice"
import theme from "./theme"
import allCategories from "./categories/allCategories"
import categoriesSortedByNum from "./categories/categoriesSortedByNum"
import user from "./user"
import listProject from "./listProject"
import proposedProjectCategories from "./categories/proposedProjectCategories"
import project from "./project"

// icrc scan
import icrcTransactions from "./icrc_scan/icrcTransactions"
import icrcTotalSupply from "./icrc_scan/icrcTotalSupply"
import icrcLedger from "./icrc_scan/icrcLedger"

// dao
import proposals from "./dao/proposals"

// modals
import nftModal from "./modals/nftModal"
import promoModal from "./modals/promoModal"
import shareModal from "./modals/shareModal"
import loading from "./loading"
import signInModal from "./modals/signInModal"
import withdrawModal from "./modals/withdrawModal"
import withdrawNftModal from "./modals/withdrawNftModal"

// projects
import paginated from "./projects/paginated"
import queryParams from "./projects/queryParams"
import curatedProjects from "./curatedProjects"

// home
import home from "./home/home"

// admin
import admin from "./admin/admin"

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
    allCategories,
    categoriesSortedByNum,
    user,
    listProject,
    proposedProjectCategories,
    project,

    // icrc scan
    icrcTransactions,
    icrcTotalSupply,
    icrcLedger,

    // dao
    proposals,

    // modals
    nftModal,
    promoModal,
    shareModal,
    loading,
    signInModal,
    withdrawModal,
    withdrawNftModal,

    // projects
    paginated,
    queryParams,
    curatedProjects,

    // home
    home,

    // admin
    admin,
  },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
