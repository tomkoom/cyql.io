import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/state/_store"
import type { ProjectV2 } from "@/state/_types/curated_projects_types"

type ProjectModalState = {
  isLoading: boolean
  isOpen: boolean
  mode: string
  project: ProjectV2
}

const initialState: ProjectModalState = {
  isLoading: false,
  isOpen: false,
  mode: "",
  project: {
    // main
    id: 0,
    name: "",
    description: "",
    category: [],
    website: "",

    // logo
    logoUrl: "",
    logoDataUrl: "",

    // links web2
    twitter: "",
    discord: "",
    telegram: "",
    github: "",
    medium: "",

    // links web3
    dscvr: "",
    distrikt: "",
    openchat: "",
    taggr: "",
    seers: "",
    nuance: "",
    catalyze: "",
    funded: "",

    // nft
    nftSaleDate: "",
    nftSaleUrl: "",
    nftUnits: "",
    nftUnitPrice: "",
    nftMarketEntrepot: "",
    nftMarketCcc: "",
    nftMarketYumi: "",
    nftRarityDgdg: "",
    nftStatsNftgeek: "",
    nftImg1: "",
    nftImg2: "",
    nftImg3: "",
    nftImg4: "",

    // ...
    app: "",
    docs: "",
    faq: "",
    whitepaper: "",

    // canisters
    frontendCanisterId: "",
    backendCanisterId: "",

    // ...
    dfinityForumShowcase: "",
    nnsLaunchpadUrl: "",

    // token
    tokenCanisterId: "",
    tokenStandard: "",

    // meta
    archived: false,
    createdAt: "",
    updatedAt: "",
    submittedBy: "",
    upvotedBy: [],
  },
}

interface ProjectItem<TValue> {
  [key: string]: TValue
}

const projectModal = createSlice({
  name: "projectModal",
  initialState,
  reducers: {
    setProjectModalIsLoading(state, { payload }: PayloadAction<boolean>) {
      state.isLoading = payload
    },
    setProjectModalIsOpen(state, { payload }: PayloadAction<boolean>) {
      state.isOpen = payload
    },
    setProjectModalMode(state, { payload }: PayloadAction<string>) {
      state.mode = payload
    },
    setProjectModalLogo(state, { payload }: PayloadAction<string>) {
      state.mode = payload
    },

    // ...
    setProject(state, { payload }: PayloadAction<ProjectV2>) {
      state.project = { ...state.project, ...payload }
    },
    setProjectItem(state, { payload }: PayloadAction<ProjectItem<string>>) {
      state.project = { ...state.project, ...payload }
    },
    setProjectCategory(state, { payload }: PayloadAction<string[]>) {
      state.project.category = payload
    },
    setProjectLogoDataUrl(state, { payload }: PayloadAction<string>) {
      state.project.logoDataUrl = payload
    },
    setProjectArchived(state, { payload }: PayloadAction<boolean>) {
      state.project.archived = payload
    },
    setProjectDescription(state, { payload }: PayloadAction<string>) {
      state.project.description = payload
    },
    setClearProject(state) {
      state.project = initialState.project
    },
    setCloseProjectModal(state) {
      state.isLoading = false
      state.isOpen = false
      state.mode = ""
      state.project = initialState.project
    },
  },
})

export const selectProjectModalIsLoading = (state: RootState) => state.projectModal.isLoading
export const selectProjectModalIsOpen = (state: RootState) => state.projectModal.isOpen
export const selectProjectModalMode = (state: RootState) => state.projectModal.mode
export const selectProjectModal = (state: RootState) => state.projectModal
// ...
export const selectProject = (state: RootState) => state.projectModal.project
export const selectProjectCategory = (state: RootState) => state.projectModal.project.category
export const selectProjectArchived = (state: RootState) => state.projectModal.project.archived
export const selectProjectDescription = (state: RootState) => state.projectModal.project.description

export const {
  setProjectModalIsLoading,
  setProjectModalIsOpen,
  setProjectModalMode,
  setProject,
  setProjectItem,
  setProjectCategory,
  setProjectLogoDataUrl,
  setProjectArchived,
  setProjectDescription,

  // clear state
  setClearProject,
  setCloseProjectModal,
} = projectModal.actions
export default projectModal.reducer
