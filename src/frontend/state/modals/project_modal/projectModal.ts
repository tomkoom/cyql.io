import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ProjectData } from "../../../../backend/types"
import { RootState } from "@/state/_store"

type ProjectModalState = {
  isOpen: boolean
  project: ProjectData
}

const initialState: ProjectModalState = {
  isOpen: false,
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
    setProjectModalIsOpen(state, { payload }: PayloadAction<boolean>) {
      state.isOpen = payload
    },
    setProject(state, { payload }: PayloadAction<ProjectData>) {
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
    setCloseProjectModal(state) {
      state.project = initialState.project
      state.isOpen = false
    },
  },
})

const selectProjectModalIsOpen = (state: RootState) => state.projectModal.isOpen
const selectProject = (state: RootState) => state.projectModal.project
const selectProjectCategory = (state: RootState) => state.projectModal.project.category
const selectProjectGrantee = (state: RootState) => state.projectModal.project.grantee
const selectProjectArchived = (state: RootState) => state.projectModal.project.archived
const selectProjectDescription = (state: RootState) => state.projectModal.project.description
export {
  selectProjectModalIsOpen,
  selectProject,
  selectProjectCategory,
  selectProjectGrantee,
  selectProjectArchived,
  selectProjectDescription,
}

export const {
  setProjectModalIsOpen,
  setProject,
  setProjectItem,
  setProjectCategory,
  setProjectGrantee,
  setProjectArchived,
  setProjectDescription,
  setCloseProjectModal,
} = projectModal.actions
export default projectModal.reducer
