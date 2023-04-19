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
    setProjectDocData(state, { payload }) {
      state.projectDoc.data = { ...state.projectDoc.data, ...payload };
    },
    setProjectCategories(state, { payload }) {
      state.projectDoc.data.categories = payload;
    },
    setProjectGrantee(state, { payload }) {
      state.projectDoc.data.grantee = payload;
    },
    setProjectArchived(state, { payload }) {
      state.projectDoc.data.archived = payload;
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

const selectProjectModal = (state) => state.projectModal.projectModal;
const selectProjectDoc = (state) => state.projectModal.projectDoc;
const selectProjectDocData = (state) => state.projectModal.projectDoc.data;
const selectProjectCategories = (state) => state.projectModal.projectDoc.data.categories;
const selectProjectGrantee = (state) => state.projectModal.projectDoc.data.grantee;
const selectProjectArchived = (state) => state.projectModal.projectDoc.data.archived;
const selectProjectDescription = (state) => state.projectModal.projectDoc.data.description;
export {
  selectProjectModal,
  selectProjectDoc,
  selectProjectDocData,
  selectProjectCategories,
  selectProjectGrantee,
  selectProjectArchived,
  selectProjectDescription,
};

export const {
  setProjectModal,
  setProjectDoc,
  setProjectDocData,
  setProjectCategories,
  setProjectGrantee,
  setProjectArchived,
  setProjectDescription,
  setCloseProjectModal,
} = projectModal.actions;
export default projectModal.reducer;
