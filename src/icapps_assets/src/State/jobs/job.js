import { createSlice } from "@reduxjs/toolkit";

const jobInitialState = {
  // position
  title: "",
  category: "",
  description: "",
  sourceUrl: "",
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
  submitted: 0,
  edited: 0,
  publisher: "",

  // icapps/jobs/types.mo
};

const job = createSlice({
  name: "job",
  initialState: {
    job: jobInitialState,
    activeJob: undefined,
  },
  reducers: {
    setJob(state, { payload }) {
      state.job = payload;
    },
    setActiveJob(state, { payload }) {
      state.activeJob = payload;
    },
  },
});

const selectJob = (state) => state.job.job;
const selectActiveJob = (state) => state.job.activeJob;
export { selectJob, selectActiveJob };

export const { setJob, setActiveJob } = job.actions;
export default job.reducer;
