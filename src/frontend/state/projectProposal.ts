import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"
import type { ProjectProposal } from "./_types/dao_types"

const initialState: ProjectProposal = {
  category: [],

  // main
  name: "",
  description: "",
  domain: "",
  backendCanisterId: "",
  frontendCanisterId: "",

  // token
  tokenLedgerId: "",
  tokenStandard: "",

  // web2 links
  x: "",
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
    setListProjectTokenLedgerId(state, { payload }: PayloadAction<string>) {
      state.tokenLedgerId = payload
    },
    setListProjectTokenStandard(state, { payload }: PayloadAction<string>) {
      state.tokenStandard = payload
    },
  },
})

export const selectListProject = (state: RootState) => state.listProject

export const { setListProject, setListProjectCategory } = listProject.actions
export default listProject.reducer
