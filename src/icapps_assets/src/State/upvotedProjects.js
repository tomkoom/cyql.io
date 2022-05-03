import { createSlice } from "@reduxjs/toolkit";

const upvotedProjects = createSlice({
  name: "upvotedProjects",
  initialState: {
    upvotedProjects: [],
  },
  reducers: {
    setUpvotedProjects(state, { payload }) {
      state.upvotedProjects = [...state.upvotedProjects, ...payload];
    },
  },
});

export const selectUpvotedProjects = (state) => state.upvotedProjects.upvotedProjects;

export const { setUpvotedProjects } = upvotedProjects.actions;
export default upvotedProjects.reducer;
