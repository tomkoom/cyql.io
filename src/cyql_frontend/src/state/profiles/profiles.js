import { createSlice } from "@reduxjs/toolkit";

const profiles = createSlice({
  name: "profiles",
  initialState: {
    profiles: [],
  },
  reducers: {
    setProfiles(state, { payload }) {
      state.profiles = payload;
    },
  },
});

const selectProfiles = (state) => state.profiles.profiles;
export { selectProfiles };

export const { setProfiles } = profiles.actions;
export default profiles.reducer;
