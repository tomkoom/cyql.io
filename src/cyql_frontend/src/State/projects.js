import { createSlice } from "@reduxjs/toolkit";

const projects = createSlice({
  name: "projects",
  initialState: {
    projectsDocs: [],
    projectsNum: 0,
  },
  reducers: {
    setProjectsDocs(state, { payload }) {
      state.projectsDocs = payload;
    },
    setProjectsNum(state, { payload }) {
      state.projectsNum = payload;
    },
  },
});

const selectProjectsDocs = (state) => state.projects.projectsDocs;
const selectProjectsNum = (state) => state.projects.projectsNum;
export { selectProjectsDocs, selectProjectsNum };

export const { setProjectsDocs, setProjectsNum } = projects.actions;
export default projects.reducer;
