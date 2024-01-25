import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Project } from "@/state/_types/types"
import { RootState } from "@/state/_store"

type ProjectModalState = {
  isLoading: boolean
  isOpen: boolean
  mode: string
  project: Project
}

const initialState: ProjectModalState = {
  isLoading: false,
  isOpen: false,
  mode: "",
  project: {
    id: "",
    submittedBy: "",
    createdAt: "",
    updatedAt: "",
    name: "",
    description: "",
    category: [],
    logo: "",
    website: "",
    canister: "",
    twitter: "",
    discord: "",
    telegram: "",
    github: "",
    medium: "",
    dscvr: "",
    distrikt: "",
    openchat: "",
    taggr: "",
    seers: "",
    nuance: "",
    catalyze: "",
    funded: "",
    app: "",
    docs: "",
    faq: "",
    whitepaper: "",
    grantee: false,
    archived: false,
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
    setProject(state, { payload }: PayloadAction<Project>) {
      state.project = { ...state.project, ...payload }
    },
    setProjectItem(state, { payload }: PayloadAction<ProjectItem<string>>) {
      state.project = { ...state.project, ...payload }
    },
    setProjectCategory(state, { payload }: PayloadAction<string[]>) {
      state.project.category = payload
    },
    setProjectGrantee(state, { payload }: PayloadAction<boolean>) {
      state.project.grantee = payload
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
const selectProject = (state: RootState) => state.projectModal.project
const selectProjectCategory = (state: RootState) => state.projectModal.project.category
const selectProjectGrantee = (state: RootState) => state.projectModal.project.grantee
const selectProjectArchived = (state: RootState) => state.projectModal.project.archived
const selectProjectDescription = (state: RootState) => state.projectModal.project.description
export {
  selectProject,
  selectProjectCategory,
  selectProjectGrantee,
  selectProjectArchived,
  selectProjectDescription,
}

export const {
  setProjectModalIsLoading,
  setProjectModalIsOpen,
  setProjectModalMode,
  setProject,
  setProjectItem,
  setProjectCategory,
  setProjectGrantee,
  setProjectArchived,
  setProjectDescription,

  // clear state
  setClearProject,
  setCloseProjectModal,
} = projectModal.actions
export default projectModal.reducer
