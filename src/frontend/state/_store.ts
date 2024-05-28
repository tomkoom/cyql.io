import { configureStore } from "@reduxjs/toolkit"
import template from "./_template"

// ...
import icpPrice from "./icpPrice"
import theme from "./theme"
import adminSearch from "./admin/adminSearch"
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
import projectModal from "./modals/projectModal"
import signInModal from "./modals/signInModal"
import withdrawModal from "./modals/withdrawModal"
import withdrawNftModal from "./modals/withdrawNftModal"

// projects
import paginated from "./projects/paginated"
import curatedProjects from "./curatedProjects"

// home
import home from "./home/home"

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
    adminSearch,
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
    projectModal,
    signInModal,
    withdrawModal,
    withdrawNftModal,

    // projects
    paginated,
    curatedProjects,

    // home
    home,
  },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
