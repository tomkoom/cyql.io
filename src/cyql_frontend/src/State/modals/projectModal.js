import { createSlice } from "@reduxjs/toolkit";

const projectInitialState = {
  // main
  name: "",
  id: "",
  slug: "",
  category: [],
  website: "",
  canister: "",
  logo: "",
  // cover: "",
  description: "",

  // socials
  twitter: "",
  discord: "",
  telegram: "",
  github: "",
  medium: "",

  // socials ic
  dscvr: "",
  distrikt: "",
  openChat: "",
  catalyze: "",
  // seers
  // nuance

  // additional info
  app: "",

  // docs
  docs: "",
  faq: "",
  whitepaper: "",

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
  added: null,
  // delete dateAdded
  edited: null,

  // token
  hasToken: null,
  // tokenName: "",
  // tokenSymbol: "",
  // tokenLogo: "",
  // tokenCanisterId: "",
  // tokenMarkets: [],
  // tokenSupply: "",
  // tokenMaxSupply: "",

  // ...
  verified: null,
  promoted: null,
  grantee: null,
  upvotedBy: [],
  connectedProjects: [],
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
    setProjectCategory(state, { payload }) {
      state.project.category = payload;
    },
    setProjectGrantee(state, { payload }) {
      state.project.grantee = payload;
    },
    setCloseProjectModal(state) {
      state.mode = "";
      state.project = projectInitialState;
      state.projectModal = false;
    },
  },
});

const selectMode = (state) => state.projectModal.mode;
const selectProjectModal = (state) => state.projectModal.projectModal;
const selectProject = (state) => state.projectModal.project;
const selectProjectCategory = (state) => state.projectModal.project.category;
const selectProjectGrantee = (state) => state.projectModal.project.grantee;
export {
  selectMode,
  selectProjectModal,
  selectProject,
  selectProjectCategory,
  selectProjectGrantee,
};

export const {
  setMode,
  setProjectModal,
  setProject,
  setProjectCategory,
  setProjectGrantee,
  setCloseProjectModal,
} = projectModal.actions;
export default projectModal.reducer;
