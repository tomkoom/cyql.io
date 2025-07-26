import { configureStore } from "@reduxjs/toolkit"
import template from "./_template"
import categories from "./categories/categories"
import proposedProjectCategories from "./categories/proposedProjectCategories"
import listProject from "./listProject"
import project from "./project"
import theme from "./theme"
import user from "./user"
import users from "./users"

// icrc scan
import icrcLedger from "./icrc_scan/icrcLedger"
import icrcTotalSupply from "./icrc_scan/icrcTotalSupply"
import icrcTransactions from "./icrc_scan/icrcTransactions"

// dao
import proposals from "./dao/proposals"

// modals
import loading from "./loading"
import promoModal from "./modals/promoModal"
import shareModal from "./modals/shareModal"
import signInModal from "./modals/signInModal"
import withdrawModal from "./modals/withdrawModal"
import withdrawNftModal from "./modals/withdrawNftModal"

// projects
import curatedProjects from "./curatedProjects"
import paginated from "./projects/paginated"
import queryParams from "./projects/queryParams"
import searchQ from "./projects/searchQ"

// home
import home from "./home/home"

// admin
import admin from "./admin/admin"

// profile
import profile from "./profile/profile"

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }),
  reducer: {
    template,
    theme,
    categories,
    user,
    listProject,
    proposedProjectCategories,
    project,
    users,

    // icrc scan
    icrcTransactions,
    icrcTotalSupply,
    icrcLedger,

    // dao
    proposals,

    // modals
    promoModal,
    shareModal,
    loading,
    signInModal,
    withdrawModal,
    withdrawNftModal,

    // projects
    paginated,
    queryParams,
    searchQ,
    curatedProjects,

    // home
    home,

    // admin
    admin,

    // profile
    profile,
  },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
