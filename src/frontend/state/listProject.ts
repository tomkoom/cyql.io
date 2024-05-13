import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"
import type { ListProjectData } from "./_types/dao_types"

interface ListProjectInitialState {
  isLogoCompressLoading: boolean
  project: ListProjectData
}

const initialState: ListProjectInitialState = {
  isLogoCompressLoading: false,
  project: {
    category: [],

    // main
    name: "",
    description: "",
    domain: "",
    backend_canister_id: "",
    frontend_canister_id: "",

    // logo
    logo_data_url: "",

    // token
    token_ledger_id: "",
    token_standard: "",

    // web2 links
    x_twitter: "",
    discord: "",
    telegram: "",
    github: "",

    // web3 links
    taggr: "",
    openchat: "",
    dscvr: "",
    funded: "",

    // ic links
    dfinity_forum_showcase: "",
    nns_launchpad_url: "",

    // docs, whitepaper, etc
    docs: "",
    whitepaper: "",
  },
}

const listProject = createSlice({
  name: "listProject",
  initialState,
  reducers: {
    setListProjectIsLogoCompressLoading(state, { payload }: PayloadAction<boolean>) {
      state.isLogoCompressLoading = payload
    },
    setListProject(state, { payload }: PayloadAction<{ [key: string]: string }>) {
      const key = Object.keys(payload)[0]
      const value = Object.values(payload)[0]

      if (key in state.project) {
        state.project[key] = value
      }
    },
    setListProjectCategory(state, { payload }: PayloadAction<string[]>) {
      state.project.category = payload
    },
    setListProjectLogoDataUrl(state, { payload }: PayloadAction<string>) {
      state.project.logo_data_url = payload
    },
    // reset
    setClearProposedProject: () => {
      return initialState
    },
  },
})

export const selectListProjectIsLogoCompressLoading = (state: RootState) =>
  state.listProject.isLogoCompressLoading
export const selectListProject = (state: RootState) => state.listProject.project

export const {
  setListProjectIsLogoCompressLoading,
  setListProject,
  setListProjectCategory,
  setListProjectLogoDataUrl,
  setClearProposedProject,
} = listProject.actions
export default listProject.reducer
