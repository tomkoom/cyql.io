import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

interface ListProjectState {
  category: string[]

  // token
  tokenLedgerId: string
  tokenStandard: string

  // main
  name: string
  description: string
  domain: string
  backendCanisterId: string
  frontendCanisterId: string

  // web2 links
  x: string
  discord: string
  telegram: string
  github: string

  // web3 links
  taggr: string
  openchat: string
  dscvr: string
  funded: string

  // ic links
  dfinityForumShowcase: string
  nnsProjectUrl: string

  // docs, whitepaper, etc
  docs: string
  whitepaper: string
}

const initialState: ListProjectState = {
  category: [],

  // token
  tokenLedgerId: "",
  tokenStandard: "",

  // main
  name: "",
  description: "",
  domain: "",
  backendCanisterId: "",
  frontendCanisterId: "",

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

      console.log(payload)

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
