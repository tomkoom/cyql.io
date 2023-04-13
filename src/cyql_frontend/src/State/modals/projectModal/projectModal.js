import { createSlice } from "@reduxjs/toolkit";
import { projectDoc } from "../../_types/projectDoc";

const projectModal = createSlice({
  name: "projectModal",
  initialState: {
    projectModal: false,
    projectDoc,
  },
  reducers: {
    setProjectModal(state, { payload }) {
      state.projectModal = payload;
    },
    setProjectDoc(state, { payload }) {
      state.projectDoc = { ...state.projectDoc, ...payload };
    },
    setProjectCategory(state, { payload }) {
      state.projectDoc.data.category = payload;
    },
    setProjectGrantee(state, { payload }) {
      state.projectDoc.data.grantee = payload;
    },
    setProjectDescription(state, { payload }) {
      state.projectDoc.data.description = payload;
    },
    setCloseProjectModal(state) {
      state.projectDoc = projectDoc;
      state.projectModal = false;
    },
  },
});

const selectMode = (state) => state.projectModal.mode;
const selectProjectModal = (state) => state.projectModal.projectModal;
const selectProjectDoc = (state) => state.projectModal.projectDoc;
const selectProjectCategory = (state) => state.projectModal.projectDoc.data.category;
const selectProjectGrantee = (state) => state.projectModal.projectDoc.data.grantee;
const selectProjectDescription = (state) => state.projectModal.projectDoc.data.description;
export {
  selectMode,
  selectProjectModal,
  selectProjectDoc,
  selectProjectCategory,
  selectProjectGrantee,
  selectProjectDescription,
};

export const {
  setMode,
  setProjectModal,
  setProjectDoc,
  setProjectCategory,
  setProjectGrantee,
  setProjectDescription,
  setCloseProjectModal,
} = projectModal.actions;
export default projectModal.reducer;
