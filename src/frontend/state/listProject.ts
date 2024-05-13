import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"
import type { ListProjectData } from "./_types/dao_types"

const initialState: ListProjectData = {
  category: [],

  // main
  name: "",
  description: "",
  domain: "",
  backendCanisterId: "",
  frontendCanisterId: "",

  // logo
  logo_data_url: "",

  // token
  tokenLedgerId: "",
  tokenStandard: "",

  // web2 links
  x: "",
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
  dfinityForumShowcase: "",
  nnsProjectUrl: "",

  // docs, whitepaper, etc
  docs: "",
  whitepaper: "",
}

const listProject = createSlice({
  name: "listProject",
  initialState,
  reducers: {
    setListProject(state, { payload }: PayloadAction<{ [key: string]: string }>) {
      const key = Object.keys(payload)[0]
      const value = Object.values(payload)[0]

      if (key in state) {
        state[key] = value
      }
    },
    setListProjectCategory(state, { payload }: PayloadAction<string[]>) {
      state.category = payload
    },
    setListProjectLogoDataUrl(state, { payload }: PayloadAction<string>) {
      state.logo_data_url = payload
    },
    setListProjectTokenLedgerId(state, { payload }: PayloadAction<string>) {
      state.tokenLedgerId = payload
    },
    setListProjectTokenStandard(state, { payload }: PayloadAction<string>) {
      state.tokenStandard = payload
    },

    // reset
    setClearProposedProject: () => {
      return initialState
    },
  },
})

export const selectListProject = (state: RootState) => state.listProject

export const {
  setListProject,
  setListProjectCategory,
  setListProjectLogoDataUrl,
  setClearProposedProject,
} = listProject.actions
export default listProject.reducer
