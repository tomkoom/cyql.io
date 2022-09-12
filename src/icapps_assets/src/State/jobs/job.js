import { createSlice } from "@reduxjs/toolkit";

const jobInitialState = {
  // position
  title: "",
  category: "",
  description: "",
  compensation: "",
  equity: "",

  // company
  companyName: "",
  companyLogoUrl: "",
  companyWebsite: "",
  companyTwitter: "",

  // application
  applicationUrl: "",
  contactEmail: "",
  contactTwitter: "",
  contactDiscord: "",

  // meta
  submitted: "",
  edited: "",
  publisher: "",

  // icapps/jobs/types.mo
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
