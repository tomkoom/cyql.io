import { createSlice } from "@reduxjs/toolkit";

const projectInitialState = {
  category: "",
  name: "",
  description: "",

  // links
  website: "",
  appURL: "",
  docsURL: "",

  // links soc
  twitter: "",
  discord: "",
  telegram: "",
  github: "",
  medium: "",

  // links ic
  canister: "",
  dscvr: "",
  distrikt: "",
  openChat: "",

  // img
  logoUrl: "",
  coverUrl: "",

  // other
  notes: "",

  // nft
  nftUnits: "",
  nftUnitPrice: "",
  nftSaleDate: "",

  // token
  // hasToken: false,
};

const projectSubmission = createSlice({
  name: "projectSubmission",
  initialState: {
    project: projectInitialState,
  },
  reducers: {
    setProjectSubmissionData(state, { payload }) {
      state.project = payload;
    },
  },
});

export const selectProjectSubmissionData = (state) => state.projectSubmission.project;

export const { setProjectSubmissionData } = projectSubmission.actions;
export default projectSubmission.reducer;
