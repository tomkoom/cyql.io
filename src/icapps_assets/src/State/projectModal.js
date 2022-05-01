import { createSlice } from "@reduxjs/toolkit";

const projectInitialState = {
  // main
  name: "",
  id: "", // slug
  category: "",
  website: "",
  canister: "",
  logo: "",
  cover: "",
  description: "",
  // social networks
  twitter: "",
  discord: "",
  telegram: "",
  github: "",
  medium: "",
  dscvr: "",
  distrikt: "",
  openChat: "",
  // additional info
  app: "",
  docs: "",
  // nft info
  nftSaleStatus: "",
  nftSaleDate: "",
  nftUnits: "",
  nftUnitPrice: "",
  nftMarketUrl: "",
  nftSaleUrl: "",
  nftRarityChecker: "",
  nftImg1: "",
  nftImg2: "",
  nftImg3: "",
  nftImg4: "",
  // meta
  added: "",
  edited: "",
};

const projectModal = createSlice({
  name: "projectModal",
  initialState: {
    mode: "",
    projectModal: false,
    project: projectInitialState,
  },
  reducers: {
    setMode(state, { payload }) {
      state.mode = payload;
    },
    setProjectModal(state, { payload }) {
      state.projectModal = payload;
    },
    setProject(state, { payload }) {
      state.project = { ...state.project, ...payload };
    },
    setClearProject(state) {
      state.project = projectInitialState;
    },
  },
});

const selectMode = (state) => state.projectModal.mode;
const selectProjectModal = (state) => state.projectModal.projectModal;
const selectProject = (state) => state.projectModal.project;

export { selectProjectModal, selectProject, selectMode };

export const { setMode, setProjectModal, setProject, setClearProject } = projectModal.actions;
export default projectModal.reducer;
