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
  company_logo_url: "",
  company_website: "",
  company_twitter: "",

  // application
  application_url: "",
  application_email: "",
  application_twitter: "",
  application_discord: "",

  // meta
  submitted: 0,
  // edited: 0,
  publisher: "",
};

const job = createSlice({
  name: "job",
  initialState: {
    job: jobInitialState,
  },
  reducers: {
    setJob(state, { payload }) {
      state.job = { ...state.job, ...payload };
    },
  },
});

const selectJob = (state) => state.job.job;
export { selectJob };

export const { setJob } = job.actions;
export default job.reducer;
