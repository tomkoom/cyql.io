import { createSlice } from "@reduxjs/toolkit";

const projectModal = createSlice({
  name: "projectModal",
  initialState: {
    projectModal: false,
    projectInfo: {},
  },
  reducers: {
    setProjectModal(state, { payload }) {
      state.projectModal = payload;
    },
    setProjectInfo(state, { payload }) {
      state.projectInfo = payload;
    },
    setEditProjectInfo(state, { payload }) {
      state.projectInfo = {
        ...state.projectInfo,
        ...payload
      };
    },
  },
});

const selectProjectModal = (state) => state.projectModal.projectModal;
const selectProjectInfo = (state) => state.projectModal.projectInfo;

export { selectProjectModal, selectProjectInfo };

export const { setProjectModal, setProjectInfo, setEditProjectInfo } = projectModal.actions;
export default projectModal.reducer;
