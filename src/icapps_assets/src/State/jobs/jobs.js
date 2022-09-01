import { createSlice } from "@reduxjs/toolkit";

const jobs = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
  },
  reducers: {
    setJobs(state, { payload }) {
      console.log(payload);
      state.jobs = payload;
    },
  },
});

const selectJobs = (state) => state.jobs.jobs;
export { selectJobs };

export const { setJobs } = jobs.actions;
export default jobs.reducer;
