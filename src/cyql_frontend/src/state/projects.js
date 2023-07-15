import { createSlice } from "@reduxjs/toolkit";

const projects = createSlice({
  name: "projects",
  initialState: {
    projectsDocs: [],
    projectsDocsActive: [],
    projectsDocsActiveNum: 0,
  },
  reducers: {
    setProjectsDocs(state, { payload }) {
      state.projectsDocs = payload;
    },
    setProjectsDocsActive(state, { payload }) {
      state.projectsDocsActive = payload;
    },
    setProjectsDocsActiveNum(state, { payload }) {
      state.projectsDocsActiveNum = payload;
    },
  },
});

const selectProjects = (state) => state.projects.projectsDocs;
const selectProjectsDocsActive = (state) => state.projects.projectsDocsActive;
const selectProjectsDocsActiveNum = (state) => state.projects.projectsDocsActiveNum;
export { selectProjects, selectProjectsDocsActive, selectProjectsDocsActiveNum };

export const { setProjectsDocs, setProjectsDocsActive, setProjectsDocsActiveNum } =
  projects.actions;
export default projects.reducer;
