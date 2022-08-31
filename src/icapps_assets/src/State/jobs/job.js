import { createSlice } from "@reduxjs/toolkit";

const jobInitialState = {
  // position
  title: "",
  category: "",
  description: "",
  compensation: "",
  equity: "",

  // company
  company_name: "",
};

const job = createSlice({
  name: "job",
  initialState: {
    job: jobInitialState,
  },
  reducers: {
    setJob(state, { payload }) {
      state.job = payload;
    },
  },
});

const selectJob = (state) => state.job.job;
export { selectJob };

export const { setJob } = job.actions;
export default job.reducer;
