import { createSlice } from "@reduxjs/toolkit";

const jobInitialState = {
  companyName: "",
};

const postJob = createSlice({
  name: "postJob",
  initialState: {
    job: jobInitialState,
  },
  reducers: {
    setJob(state, { payload }) {
      state.job = payload;
    },
  },
});

const selectJob = (state) => state.postJob.setJob;
export { selectJob };

export const { setJob } = postJob.actions;
export default postJob.reducer;
