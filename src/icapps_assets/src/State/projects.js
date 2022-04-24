import { createSlice } from "@reduxjs/toolkit";

const projects = createSlice({
  name: "projects",
  initialState: {
    projects: [],
  },
  reducers: {
    setProjects(state, { payload }) {
      state.projects = [...payload];
    },
    setProjectsNum(state, { payload }) {
      state.projectsNum = payload;
    },
  },
});

export const selectProjects = (state) => state.projects.projects;

export const { setProjects } = projects.actions;
export default projects.reducer;
