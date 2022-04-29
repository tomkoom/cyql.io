import { createSlice } from "@reduxjs/toolkit";

const timestamp = Date.now();

const projectModal = createSlice({
  name: "projectModal",
  initialState: {
    projectModal: false,
    project: {
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
      // meta
      edited: timestamp,
    },
  },
  reducers: {
    setProjectModal(state, { payload }) {
      state.projectModal = payload;
    },
    setProject(state, { payload }) {
      state.project = { ...state.project, ...payload };
    },
    setEditProject(state, { payload }) {
      state.project = { ...state.project, ...payload };
    },
  },
});

const selectProjectModal = (state) => state.projectModal.projectModal;
const selectProject = (state) => state.projectModal.project;

export { selectProjectModal, selectProject };

export const { setProjectModal, setProject, setEditProject } = projectModal.actions;
export default projectModal.reducer;
